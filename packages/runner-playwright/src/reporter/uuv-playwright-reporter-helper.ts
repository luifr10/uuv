import { FullConfig, FullResult, Suite, TestCase, TestResult, Location, TestStatus } from "@playwright/test/reporter";
import { generateMessages } from "@cucumber/gherkin";
import { Query } from "@cucumber/gherkin-utils";
import { Envelope, IdGenerator, parseEnvelope, SourceMediaType } from "@cucumber/messages";
import fs from "fs";
import { UUVPlaywrightCucumberMapFile, UUVPlaywrightCucumberMapItem } from "../lib/runner-playwright";
import report from "multiple-cucumber-html-reporter";
import { Formatter } from "cucumber-json-report-formatter";
import { v4 as uuidv4 } from "uuid";
import { TestStep } from "@playwright/test/types/testReporter";
import chalk from "chalk";
import chalkTable from "chalk-table";


const NANOS_IN_SECOND = 1000000000;
const NANOS_IN_MILLISSECOND = 1000000;
export enum GeneratedReportType {
    CONSOLE = "console",
    HTML = "html"
}

class ReportOfFeature {
    passed = 0;
    skipped = 0;
    failed = 0;

    increment(status: TestStatus) {
        if (status === "passed") {
            this.passed++;
        } else if (status === "skipped") {
            this.skipped++;
        } else if (status === "failed") {
            this.failed++;
        }
    }
}

interface TestError {
    scenario: string;
    error: string | Buffer;
}

class UuvPlaywrightReporterHelper {
    private UUVPlaywrightCucumberMap: UUVPlaywrightCucumberMapItem[] = [];
    testDir!: string;
    private queries: Map<string, Query> = new Map<string, Query>();
    envelopes: Envelope[] = [];
    private testCasesAndTestCasesStartedIdMap: Map<string, string> = new Map<string, string>();
    private testCasesAndPickleIdMap: Map<string, string> = new Map<string, string>();
    private testCasesTestStepStartedIdMap: Map<string, number> = new Map<string, number>();
    private testStepLocationAndTestStepIdMap: Map<string, string> = new Map<string, string>();
    private consoleReportMap: Map<string, ReportOfFeature> = new Map<string, ReportOfFeature>();
    private errors: TestError[] = [];

    public createTestRunStartedEnvelope(config: FullConfig, suite: Suite, startTimestamp: { seconds: number; nanos: number }) {
        this.testDir = config.projects[0].testDir;
        this.loadUUVPlaywrightCucumberMap();
        const featureFiles = this.getFeatureFiles(suite);
        this.initializeCucumberReportNdJson(suite, featureFiles);
        this.envelopes.push(
            this.createEnvelope({
                testRunStarted: {
                    timestamp: startTimestamp
                }
            })
        );
    }

    public createTestCaseStartedEnvelope(
        test: TestCase,
        result: TestResult,
        featureFile: string,
        startTimestamp: { seconds: number; nanos: number }
    ) {
        const currentQuery = this.queries.get(featureFile);
        if (currentQuery) {
            const newTestCaseEnvelope = this.createEnvelope({
                testCase: {
                    id: test.id,
                    pickleId: this.testCasesAndPickleIdMap.get(test.id),
                    testSteps: this.generateTestStep(currentQuery, test)
                }
            });
            let newCurrentQuery = currentQuery.update(newTestCaseEnvelope);
            this.envelopes.push(newTestCaseEnvelope);

            const testCaseStartedId = uuidv4();
            const newTestCaseStartedEnvelope = this.createEnvelope({
                testCaseStarted: {
                    id: testCaseStartedId,
                    testCaseId: test.id,
                    attempt: result.retry,
                    timestamp: startTimestamp
                }
            });
            newCurrentQuery = newCurrentQuery.update(newTestCaseStartedEnvelope);
            this.envelopes.push(newTestCaseStartedEnvelope);
            this.queries.set(featureFile, newCurrentQuery);
            this.testCasesAndTestCasesStartedIdMap.set(test.id, testCaseStartedId);
            this.initConsoleReportIfNotExists(featureFile);
        }
    }

    public createTestStepStartedEnvelope(test: TestCase, step: TestStep, featureFile: string, startTimestamp: { seconds: number; nanos: number }) {
        const currentQuery = this.queries.get(featureFile);
        if (currentQuery && step.location) {
            let newIndexStep = this.testCasesTestStepStartedIdMap.get(test.id);
            newIndexStep = newIndexStep ? newIndexStep + 1 : 1;

            const pickleId = this.testCasesAndPickleIdMap.get(test.id);
            const pickle = currentQuery.getPickles()
                .find(pickle => pickle.id === pickleId);
            const testStep = pickle?.steps[newIndexStep - 1];
            if (testStep?.id && step.title.endsWith(testStep.text)) {
                this.testCasesTestStepStartedIdMap.set(test.id, newIndexStep);
                this.testStepLocationAndTestStepIdMap.set(this.getTestStepKey(step.location), testStep.id);
                const newTestStepEnvelope = this.createEnvelope({
                    testStepStarted: {
                        testStepId: testStep.id,
                        testCaseStartedId: this.testCasesAndTestCasesStartedIdMap.get(test.id),
                        timestamp: startTimestamp
                    }
                });
                this.envelopes.push(newTestStepEnvelope);
            }
        }
    }

    private createTestStepSkippedEnvelope(test: TestCase, featureFile: string, timestamp: { seconds: number; nanos: number }) {
        const currentQuery = this.queries.get(featureFile);
        if (currentQuery) {
            const newIndexStepTemp = this.testCasesTestStepStartedIdMap.get(test.id);
            const newIndexStep = newIndexStepTemp !== undefined ? newIndexStepTemp + 1 : 1;

            if (newIndexStep !== undefined) {
                const pickleId = this.testCasesAndPickleIdMap.get(test.id);
                currentQuery.getPickles()
                    .find(pickle => pickle.id === pickleId)
                    ?.steps
                    .filter((value, index) => index >= (newIndexStep - 1))
                    .forEach((pickleStep, index) => {
                        const newTestStepStartedEnvelope = this.createEnvelope({
                            testStepStarted: {
                                testStepId: pickleStep.id,
                                testCaseStartedId: this.testCasesAndTestCasesStartedIdMap.get(test.id),
                                timestamp: timestamp
                            }
                        });
                        this.envelopes.push(newTestStepStartedEnvelope);

                        const newTestStepSkippedEnvelope = this.createEnvelope({
                            testStepFinished: {
                                testStepId: this.testCasesAndTestCasesStartedIdMap.get(test.id),
                                testCaseStartedId: pickleStep.id,
                                testStepResult: {
                                    status: "SKIPPED",
                                    duration: {
                                        seconds: 0,
                                        nanos: 0
                                    }
                                },
                                timestamp: timestamp
                            }
                        });
                        this.envelopes.push(newTestStepSkippedEnvelope);
                        this.consoleReportMap.get(featureFile)?.increment("skipped");
                    });
            }
        }
    }

    public createTestStepFinishedEnvelope(test: TestCase, step: TestStep, result: TestResult, featureFile: string, startTimestamp: { seconds: number; nanos: number }) {
        const currentQuery = this.queries.get(featureFile);
        if (currentQuery && step.location) {
            const testStepId = this.testStepLocationAndTestStepIdMap.get(this.getTestStepKey(step.location));
            if (testStepId) {
               const newTestStepEnvelope = this.createEnvelope({
                    testStepFinished: {
                        testStepId: testStepId,
                        testCaseStartedId: this.testCasesAndTestCasesStartedIdMap.get(test.id),
                        testStepResult: {
                            status: this.getStatus(step),
                            duration: {
                                seconds: result.duration / 1000,
                                nanos: result.duration * NANOS_IN_MILLISSECOND
                            }
                        },
                        timestamp: startTimestamp
                    }
                });
                this.envelopes.push(newTestStepEnvelope);
            }
        }
    }

    private getTestStepKey(location: Location) {
        return `${location.file.replaceAll("\\", "_")}-${location.line}-${location.column}`;
    }

    public createTestCaseFinishedEnvelope(test: TestCase, result: TestResult, featureFile: string, endTimestamp) {
        const currentQuery = this.queries.get(featureFile);
        if (currentQuery) {
            if (result.status === "skipped" || result.status === "failed") {
                this.createTestStepSkippedEnvelope(test, featureFile, endTimestamp);
            }
            const newTestCaseFinishedEnvelope = this.createEnvelope({
                testCaseFinished: {
                    testCaseStartedId: this.testCasesAndTestCasesStartedIdMap.get(test.id),
                    attempt: result.retry,
                    timestamp: endTimestamp
                }
            });
            currentQuery.update(newTestCaseFinishedEnvelope);
            this.envelopes.push(newTestCaseFinishedEnvelope);
            this.updateConsoleReport(featureFile, result);
        }
    }

    private initConsoleReportIfNotExists(featureFile: string) {
        if (!this.consoleReportMap.get(featureFile)) {
            this.consoleReportMap.set(featureFile, new ReportOfFeature());
        }
    }

    private updateConsoleReport(featureFile: string, result: TestResult) {
        this.consoleReportMap.get(featureFile)?.increment(result.status);
    }

    public createTestRunFinishedEnvelope (result: FullResult) {
        const endDate = new Date();
        const durationInSecond = endDate.getTime() / 1000;
        this.envelopes.push(
            parseEnvelope(
                JSON.stringify({
                    testRunFinished: {
                        success: result.status === "passed",
                        timestamp: {
                            seconds: durationInSecond,
                            nanos: Math.floor(durationInSecond * NANOS_IN_SECOND + durationInSecond)
                        }
                    }
                })
            )
        );
    }

    public async generateReport(reportType: GeneratedReportType) {
        this.displayConsoleReport();
        if (reportType === GeneratedReportType.HTML) {
            await this.generateHtmlReport();
        }
    }

    public getTimestamp(inpuDate?: Date) {
        const date = inpuDate ? inpuDate : new Date();
        const durationInSecond = date.getTime() / 1000;
        const NANOS_IN_SECOND = 1000000000;
        return {
            seconds: durationInSecond,
            nanos: Math.floor(durationInSecond * NANOS_IN_SECOND + durationInSecond)
        };
    }

    public getOriginalFeatureFile(generateFile: string): string | undefined {
        return this.UUVPlaywrightCucumberMap.find(item => item.generatedFile === generateFile)?.originalFile;
    }

    public getCurrentRunningScenario(test: TestCase, featureFile: string) {
        const counter = `[${test.parent.allTests().filter(test => test.results.length > 0).length}/${test.parent.allTests().length}]`;
        return `File ${featureFile} > Scenario ${counter} - ${test.title}`;
    }

    public addError(newError: TestError) {
        this.errors.push(newError);
    }

    private getStatus(step: TestStep) {
        if (step.error === undefined) {
            return "PASSED";
        } else {
            return "FAILED";
        }
    }

    private createEnvelope(content: any) {
        return parseEnvelope(
            JSON.stringify(content)
        );
    }

    private createCucumberNdJsonFile(outputFileName: string) {
        try {
            console.log(`writting file ${outputFileName}`);
            this.envelopes.forEach((envelope, index) => {
                fs.writeFileSync(
                    outputFileName,
                    `${JSON.stringify(envelope)}\r\n`,
                    {
                        flag: index === 0 ? "w+" : "a"
                    }
                );
            });
        } catch (err) {
            console.log(err);
        }
    }

    private loadUUVPlaywrightCucumberMap() {
        this.UUVPlaywrightCucumberMap = JSON.parse(
            fs.readFileSync(
                `${this.testDir}/${UUVPlaywrightCucumberMapFile}`,
                { encoding: "utf8" }
            )
        );
    }

    private initializeCucumberReportNdJson(suite: Suite, featureFiles: string[]) {
        featureFiles.forEach(featureFile => {
            const originalFile = this.getOriginalFeatureFile(featureFile);
            if (originalFile) {
                const currentEnvelopes = generateMessages(
                    fs.readFileSync(originalFile).toString(),
                    originalFile,
                    SourceMediaType.TEXT_X_CUCUMBER_GHERKIN_PLAIN,
                    {
                        includeSource: true,
                        includeGherkinDocument: true,
                        newId: IdGenerator.uuid(),
                        includePickles: true
                    }
                );
                const currentQuery = new Query();
                currentEnvelopes.forEach(envelope => currentQuery.update(envelope));
                this.queries.set(originalFile, currentQuery);
                this.envelopes = this.envelopes.concat(currentEnvelopes);
                this.populateTestCasesAndPickleIdMap(currentQuery, suite, featureFile);
            }
        });
    }

    private populateTestCasesAndPickleIdMap(currentQuery: Query, suite: Suite, featureFile: string) {
        const pickles = currentQuery.getPickles();
        const featureFileTestSuite = suite.allTests()
            .filter(testCase => testCase.location.file === featureFile);
        featureFileTestSuite.forEach((testCase, index) => {
            this.testCasesAndPickleIdMap.set(testCase.id, pickles[index].id);
        });
    }

    private generateTestStep(currentQuery: Query, test: TestCase): any {
        const pickleId = this.testCasesAndPickleIdMap.get(test.id);
        return currentQuery.getPickles()
            .find(pickle => pickle.id === pickleId)
            ?.steps
            .map((step) => {
                return {
                    id: step.id,
                    pickleStepId: step.id,
                    stepDefinitionIds: [this.createStepDefinitionEnvelope()]
                };
            });
    }

    private createStepDefinitionEnvelope(): string {
        const stepDefinitionId = uuidv4();
        this.envelopes.push(
            this.createEnvelope({
                stepDefinition: {
                    id: stepDefinitionId,
                    pattern: {
                        source: "a step",
                        type: "CUCUMBER_EXPRESSION"
                    },
                    sourceReference: {
                        uri: "not available",
                        location: {
                            line: 0
                        }
                    }
                }
            })
        );
        return stepDefinitionId;
    }

    private getFeatureFiles(suite: Suite) {
        return [...new Set(suite.allTests().map(testCase => testCase.location?.file))];
    }

    private async formatCucumberMessageFile(inputMessageFile: string, outputFormattedFileJson:string) {
        const formatter = new Formatter();
        await formatter.parseCucumberJson(inputMessageFile, outputFormattedFileJson);
    }

    private generateHtmlReportFromJson(reportDirHtml: string, reportDirJson: string) {
        report.generate({
            jsonDir: reportDirJson,
            reportPath: reportDirHtml
        });
    }

    private async generateHtmlReport() {
        // @ts-ignore
        const reportDir = `${process.env.CONFIG_DIR}/reports`;
        const outputMessageFile = `${reportDir}/cucumber-messages.ndjson`;
        const reportDirHtml = `${reportDir}/html`;
        const reportDirJson = `${reportDir}/json`;
        const outputFormattedFileJson = `${reportDirJson}/cucumber-report.json`;
        this.createdDirIfNeeded(reportDir);
        this.createdDirIfNeeded(reportDirHtml);
        this.createdDirIfNeeded(reportDirJson);
        this.createCucumberNdJsonFile(outputMessageFile);
        await this.formatCucumberMessageFile(outputMessageFile, outputFormattedFileJson);
        this.generateHtmlReportFromJson(reportDirHtml, reportDirJson);
    }

    private createdDirIfNeeded(reportDir: string) {
        // Creating needed dirs
        if (!fs.existsSync(reportDir)) {
            fs.mkdirSync(reportDir, { recursive: true });
        }
    }

    private displayConsoleReport() {
        const consoleReport : any[] = [];
        const chalkTableOptions = {
            leftPad: 2,
            columns: [
                { field: "id",     name: "Id" },
                { field: "file",     name: "File" },
                { field: "passed",  name: chalk.green("Passed") },
                { field: "skipped", name: chalk.yellow("Skipped") },
                { field: "failed",  name: chalk.red("Failed") }
            ]
        };
        let index = 1;
        this.consoleReportMap.forEach((value, key) => {
            consoleReport.push({
                id: index,
                file: key,
                passed: chalk.green(value.passed),
                skipped: chalk.yellow(value.skipped),
                failed: chalk.red(value.failed)
            });
            index++;
        });

        if (this.errors.length > 0) {
            console.log("\n\n");
            console.log(chalk.underline(chalk.bgRed(`${this.errors.length} Error(s) :`)));
            this.errors.forEach(error => {
                console.log(error.scenario);
                console.log(chalk.red(error.error.toString()));
                console.log("");
            });
            console.log("");
        }

        console.log(chalk.underline(chalk.bgBlue("Test Execution Report :")));
        console.log(
            chalkTable(
                chalkTableOptions,
                consoleReport
            )
        );
        console.log("\n\n");
    }
}

export default UuvPlaywrightReporterHelper;
