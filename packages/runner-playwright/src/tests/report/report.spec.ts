import { JunitReport, JunitReportHelper } from "@uuv/runner-commons/test";
import path from "path";
import { expect } from "@jest/globals";

describe("Runner Playwright JunitReport", () => {
    let report: JunitReport;

    beforeAll(async () => {
        report = await JunitReportHelper.readReport(path.join(__dirname, "../../../reports/e2e/junit-report.xml")) as JunitReport;
    });

    test("Should have good results", () => {
        expect(report.testsuites.tests).toEqual("101");
        expect(report.testsuites.failures).toEqual("2");
        expect(report.testsuites.errors).toEqual("0");
        expect(report.testsuites.skipped).toEqual("0");
    });

    test("Should fail for test : Ko Homepage - Bad title", () => {
        const testCase = JunitReportHelper.getTestCase(report, "ko.feature.spec.js", "Ko › Homepage - Bad title");
        expect(testCase?.failure._).toContain("Error: Timed out 5000ms waiting for expect(locator).toHaveCount(expected)");
        expect(testCase?.failure._).toContain("Locator: getByRole('heading', { name: 'Welcome to Weather App - ko', exact: true, includeHidden: true })");
    });

    test("Should fail for test : Ko TownResearch - Bad textbox name", () => {
        const testCase = JunitReportHelper.getTestCase(report, "ko.feature.spec.js", "Ko › TownResearch - Bad textbox name");
        expect(testCase?.failure._).toContain("Error: Timed out 5000ms waiting for expect(locator).toHaveCount(expected)");
        expect(testCase?.failure._).toContain("Locator: getByRole('textbox', { name: 'Search for a town3', exact: true, includeHidden: true })");
    });
});
