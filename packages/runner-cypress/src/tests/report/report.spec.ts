import { JunitReport, JunitReportHelper } from "@uuv/runner-commons/test";
import path from "path";
import { expect } from "@jest/globals";

describe("Runner Cypress JunitReport", () => {
    let report: JunitReport;

    beforeAll(async () => {
        report = await JunitReportHelper.readReport(path.join(__dirname, "../../../reports/e2e/junit-report.xml")) as JunitReport;
    });

    test("Should have good results", () => {
        expect(report.testsuites.tests).toEqual("130");
        expect(report.testsuites.failures).toEqual("8");
        expect(report.testsuites.errors).toBeUndefined();
        expect(report.testsuites.skipped).toBeUndefined();
    });

    test("Should fail for test : Ko Homepage - Bad title", () => {
        const testCase = JunitReportHelper.getTestCase(report, "Ko", "Ko Homepage - Bad title");
        expect(testCase?.failure._).toContain("Timed out retrying after 6000ms: Unable to find an accessible element with the role \"heading\" and name \"Welcome to Weather App - ko\"");
    });

    test("Should fail for test : Ko TownResearch - Bad textbox name", () => {
        const testCase = JunitReportHelper.getTestCase(report, "Ko", "Ko TownResearch - Bad textbox name");
        expect(testCase?.failure._).toContain("Timed out retrying after 6000ms: Unable to find an accessible element with the role \"textbox\" and name \"Search for a town3\"");
    });

    test("Should fail for test : Ko click failed with custom timeout", () => {
        const testCase = JunitReportHelper.getTestCase(report, "Ko", "Ko click failed with custom timeout");
        expect(testCase?.failure._).toContain("Timed out retrying after 9000ms: Unable to find an accessible element with the role \"button\" and name \"Timer ended\"");
    });
});
