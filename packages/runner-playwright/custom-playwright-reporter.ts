import { FullConfig, FullResult, Reporter, Suite, TestCase, TestResult } from "@playwright/test/reporter";
import { TestStep } from "@playwright/test/types/testReporter";

class MyReporter implements Reporter {
    onBegin(config: FullConfig, suite: Suite) {
        console.log(`Starting the run with ${suite.allTests().length} tests`);
    }

    onTestBegin(test: TestCase, result: TestResult) {
        console.log(`Starting test ${test.title} - ${test.annotations}`);
        console.dir(test.annotations);
    }

    onStepBegin(test: TestCase, result: TestResult, step: TestStep) {
        console.log(`Starting step ${test.title} - ${step.title}`);
    }

    onStepEnd(test: TestCase, result: TestResult, step: TestStep) {
        console.log(`Starting step ${test.title} - ${step.title}  - ${step.error}`);
    }

    onTestEnd(test: TestCase, result: TestResult) {
        console.log(`Finished test ${test.title}: ${result.status}`);
    }

    onEnd(result: FullResult) {
        console.log(`Finished the run: ${result.status}`);
    }
}

export default MyReporter;
