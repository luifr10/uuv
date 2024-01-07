import { Browser, Page } from "puppeteer";
import { injectUvvA11YAndLoadUrl } from "../../commons-test";
import * as path from "path";

describe("Query - ByTag", () => {
    let browser: Browser;
    let page: Page;

    beforeEach(async () => {
        const context = await injectUvvA11YAndLoadUrl(path.join(__dirname, "by-tag.html"));
        browser = context.browser;
        page = context.page;
    });

    afterEach(async () => {
        await browser?.close();
    });

    async function executeQuery(selectors: string[]) {
        return await page.evaluate(async (selectors) => {
            // @ts-ignore
            const byTagQuery = new uuvA11y.ByTagQuery(selectors);
            const elements = await byTagQuery.execute();
            return elements.map(element => element.getAttribute("data-testid"));
        }, selectors);
    }

    it("should return elements for unique selector", async () => {
        const elementDataTestId: string[] = await executeQuery(["img:not([alt])"]);
        await expect(elementDataTestId).toBeTruthy();
        await expect(elementDataTestId).toEqual(["img", "img-with-aria-label"]);
    });

    it("should return elements for multiple selector", async () => {
        const elementDataTestId: string[] = await executeQuery(["img:not([alt])", "span[some-attr]"]);
        await expect(elementDataTestId).toBeTruthy();
        await expect(elementDataTestId).toEqual(["simple-span", "img", "img-with-aria-label"]);
    });
});
