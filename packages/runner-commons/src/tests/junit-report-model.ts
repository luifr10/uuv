import { parseStringPromise } from "xml2js";
import fs from "fs";

export interface JunitReport {
    testsuites: TestSuites;
}

export interface TestSuites {
    id: string;
    name: string;
    tests: string;
    failures: string;
    skipped: string;
    errors: string;
    time: string;
    testsuite: TestSuite[];
}

export interface TestSuite {
    name: string;
    timestamp: string;
    hostname: string;
    tests: string;
    failures: string;
    skipped: string;
    errors: string;
    time: string;
    testcase: TestCase | TestCase[];
}

export interface TestCase {
    name: string;
    classname: string;
    time: string;
    "system-out": string;
    "system-err": string;
    failure: {
        message: string,
        type: string,
        _: string,
    };
}

export class JunitReportHelper {
    static readReport(path: string) {
        return parseStringPromise(
            fs.readFileSync(
                path,
                {
                    encoding: "utf8", flag: "r"
                }
            ),
            { explicitArray: false, mergeAttrs: true }
        );
    }

    static getTestCase(report: JunitReport, testSuiteName: string, testCaseName: string ): TestCase | undefined {
        const testSuite = report.testsuites.testsuite.find(ts => ts.name === testSuiteName);
        if (testSuite) {
            if (Object.prototype.hasOwnProperty.call(testSuite.testcase, "name")) {
                if ((testSuite.testcase as TestCase).name === testCaseName) {
                    return testSuite.testcase as TestCase;
                }
            } else {
                return (testSuite.testcase as TestCase[]).find(tc => tc.name === testCaseName);
            }
        }
        return;
    }
}
