import { Browser, Page } from "puppeteer";
import { injectUvvA11YAndLoadUrl } from "../../commons-test";
import * as path from "path";

describe("Query - Doctype", () => {
    let browser: Browser;
    let page: Page;

    afterEach(async () => {
        await browser?.close();
    });

    async function executeQuery() {
        return await page.evaluate(async () => {
            // @ts-ignore
            const doctypeQuery = new uuvA11y.DoctypeQuery();
            const elements = await doctypeQuery.execute();
            return elements.map(element => element.getAttribute("data-testid"));
        });
    }

    async function initA11yOnPage(file: string) {
        const context = await injectUvvA11YAndLoadUrl(path.join(__dirname, file));
        browser = context.browser;
        page = context.page;
    }

    it("should return element for doctype-ko.html", async () => {
        await initA11yOnPage("doctype-ko.html");

        const elementDataTestId: string[] = await executeQuery();
        await expect(elementDataTestId).toBeTruthy();
        await expect(elementDataTestId).toEqual(["html"]);
    });

    it("should return no element for doctype-ok.html", async () => {
        await initA11yOnPage("doctype-ok.html");

        const elementDataTestId: string[] = await executeQuery();
        await expect(elementDataTestId).toBeTruthy();
        await expect(elementDataTestId).toEqual([]);
    });
});
