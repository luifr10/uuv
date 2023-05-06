import { FullConfig, FullResult, Reporter, Suite, TestCase, TestResult } from "@playwright/test/reporter";
import { TestStep } from "@playwright/test/types/testReporter";
import UUVPlaywrightReporterHelper from "./uuv-playwright-reporter-helper";
import chalk from "chalk";
import DraftLog from "draftlog";

class UUVPlawrightReporter implements Reporter {
    private helper: UUVPlaywrightReporterHelper = new UUVPlaywrightReporterHelper();
    private testOutputLogger: any;

    onBegin(config: FullConfig, suite: Suite) {
        const startTimestamp = this.helper.getTimestamp();
        // console.log(`Starting the run with ${suite.allTests().length} tests`);
        this.helper.createTestRunStartedEnvelope(config, suite, startTimestamp);
        DraftLog.into(console);
        this.testOutputLogger = console.draft(`Starting the run with ${suite.allTests().length} tests`);

    }


    onTestBegin(test: TestCase, result: TestResult) {
        const startTimestamp = this.helper.getTimestamp(result.startTime);
        // console.log(`Starting test ${test.title} - ${test.parent.location?.file}`);
        this.testOutputLogger(`[${test.parent.allTests().filter(test => test.results.length > 0).length}/${test.parent.allTests().length}] Running test ${test.title}`);
        const featureFile = this.helper.getOriginalFeatureFile(test.location.file);
        if (featureFile) {
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
        this.testOutputLogger(`Finished test ${test.title}`);
        const featureFile = this.helper.getOriginalFeatureFile(test.location.file);
        if (featureFile) {
            this.helper.createTestCaseFinishedEnvelope(test, result, featureFile, endTimestamp);
        }
    }

    async onEnd(result: FullResult) {
        // console.debug(`Finished the run: ${result.status}`);
        this.helper.createTestRunFinishedEnvelope(result);
        await this.helper.generateReport();
        if (result.status === "passed") {
            console.log(chalk.green("Tests executed successfully"));
        } else {
            console.error(chalk.red(`Tests executed with status: ${result.status}`));
        }
    }
}

export default UUVPlawrightReporter;
