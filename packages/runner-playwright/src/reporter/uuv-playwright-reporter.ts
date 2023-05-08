import { FullConfig, FullResult, Reporter, Suite, TestCase, TestResult } from "@playwright/test/reporter";
import { TestError, TestStep } from "@playwright/test/types/testReporter";
import UuvPlaywrightReporterHelper, { GeneratedReportType } from "./uuv-playwright-reporter-helper";
import chalk from "chalk";
import DraftLog from "draftlog";

class UuvPlawrightReporter implements Reporter {
    private helper: UuvPlaywrightReporterHelper = new UuvPlaywrightReporterHelper();
    private reporterStaticConsoleLogger: any;

    onBegin(config: FullConfig, suite: Suite) {
        const startTimestamp = this.helper.getTimestamp();
        // console.log(`Starting the run with ${suite.allTests().length} tests`);
        this.helper.createTestRunStartedEnvelope(config, suite, startTimestamp);
        DraftLog(console).addLineListener(process.stdin);
        console.log(
            chalk.yellow(`Starting the run with ${suite.allTests().length} tests`)
        );
        this.reporterStaticConsoleLogger = console.draft(
            chalk.yellow("!!! Fasten seat belt !!!")
        );
    }

    onError?(error: TestError): void {
        console.dir(chalk.red(error));
    }

    onStdErr?(chunk: string|Buffer, test: void|TestCase, result: void|TestResult): void {
        let scenario = "unknown";
        if ((test as TestCase)?.id !== undefined) {
            const featureFile = this.helper.getOriginalFeatureFile((test as TestCase).location.file);
            if (featureFile) {
                scenario = this.helper.getCurrentRunningScenario((test as TestCase), featureFile);
            }
        }
        this.helper.addError({
            scenario: scenario,
            error: chunk
        });
    }


    onTestBegin(test: TestCase, result: TestResult) {
        const startTimestamp = this.helper.getTimestamp(result.startTime);
        // console.log(`Starting test ${test.title} - ${test.parent.location?.file}`);
        const featureFile = this.helper.getOriginalFeatureFile(test.location.file);
        if (featureFile) {
            this.reporterStaticConsoleLogger(
                chalk.blueBright(`Running > ${this.helper.getCurrentRunningScenario(test, featureFile)}`)
            );
            this.helper.createTestCaseStartedEnvelope(test, result, featureFile, startTimestamp);
        }
    }

    onStepBegin(test: TestCase, result: TestResult, step: TestStep) {
        const startTimestamp = this.helper.getTimestamp(result.startTime);
        // console.log(`Starting step ${test.title} - ${step.title} - ${step.location?.file} - ${step.location?.line} - ${step.location?.column}`);
        const featureFile = this.helper.getOriginalFeatureFile(test.location.file);
        if (featureFile) {
            this.helper.createTestStepStartedEnvelope(test, step, featureFile, startTimestamp);
        }
    }

    onStepEnd(test: TestCase, result: TestResult, step: TestStep) {
        const endTimestamp = this.helper.getTimestamp(result.startTime);
        // console.log(`End step ${test.title} - ${step.title} - ${result.status} - ${step.error}`);
        const featureFile = this.helper.getOriginalFeatureFile(test.location.file);
        if (featureFile) {
            this.helper.createTestStepFinishedEnvelope(test, step, result, featureFile, endTimestamp);
        }
    }

    onTestEnd(test: TestCase, result: TestResult) {
        const endTimestamp = this.helper.getTimestamp();
        // console.log(`Finished test ${test.title}: ${result.status}`);
        const featureFile = this.helper.getOriginalFeatureFile(test.location.file);
        if (featureFile) {
            this.helper.createTestCaseFinishedEnvelope(test, result, featureFile, endTimestamp);
        }
    }

    async onEnd(result: FullResult) {
        // console.debug(`Finished the run: ${result.status}`);
        this.helper.createTestRunFinishedEnvelope(result);
        console.log(
            chalk.yellow("End of the tests execution")
        );
        await this.helper.generateReport(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            process.env.REPORT_TYPE as GeneratedReportType
        );
        if (result.status === "passed") {
            console.log(chalk.green("Tests executed successfully"));
        } else {
            console.error(chalk.red(`Tests executed with status: ${result.status}`));
        }
    }
}

export default UuvPlawrightReporter;
