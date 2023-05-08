import { Formatter } from "cucumber-json-report-formatter";
import report from "multiple-cucumber-html-reporter";

async function formatCucumberMessageFile() {
    const formatter = new Formatter();
    const input = "./reports/cucumber-messages.ndjson";
    const outputFile = "reports/json/cucumber-report.json";
    await formatter.parseCucumberJson(input, outputFile);
}

function generateHtmlReportFromJson(browser: string, argv: any) {
    const UNKOWN_VALUE = "unknown";
    report.generate({
        jsonDir: "reports/json",
        reportPath: "reports/html"
    });
}

async function main() {
    await formatCucumberMessageFile();
    generateHtmlReportFromJson("browser", null);
}
main();
