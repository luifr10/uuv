import { Browser, Page } from "puppeteer";
import { injectUvvA11YAndLoadUrl } from "../../commons-test";
import * as path from "path";

describe("Query - AccessibleName", () => {
    let browser: Browser;
    let page: Page;

    beforeEach(async () => {
        const context = await injectUvvA11YAndLoadUrl(path.join(__dirname, "accessible-name.html"));
        browser = context.browser;
        page = context.page;
    });

    afterEach(async () => {
        await browser?.close();
    });

    async function executeQueryByRole(roleName: string, shouldBeEmpty: boolean) {
        return await page.evaluate(async (roleName, shouldBeEmpty) => {
            // @ts-ignore
            const subQuery = new uuvA11y.ByRoleQuery(roleName);
            // @ts-ignore
            const accessibleNameQuery = new uuvA11y.AccessibleNameQuery(subQuery, shouldBeEmpty);
            const elements = await accessibleNameQuery.execute();
            return elements.map(element => element.getAttribute("data-testid"));
        }, roleName, shouldBeEmpty);
    }

    async function executeQueryByTag(selectors: string[], shouldBeEmpty: boolean) {
        return await page.evaluate(async (selectors, shouldBeEmpty) => {
            // @ts-ignore
            const subQuery = new uuvA11y.ByTagQuery(selectors);
            // @ts-ignore
            const accessibleNameQuery = new uuvA11y.AccessibleNameQuery(subQuery, shouldBeEmpty);
            const elements = await accessibleNameQuery.execute();
            return elements.map(element => element.getAttribute("data-testid"));
        }, selectors, shouldBeEmpty);
    }

    it("should return elements for empty accessible name", async () => {
        const elementDataTestId: string[] = await executeQueryByRole("button", true);
        await expect(elementDataTestId).toBeTruthy();
        await expect(elementDataTestId).toEqual([
            "btn-with-empty-arialabel-and-content",
            "btn-with-non-existing-arialabelledby-and-empty"
        ]);
    });

    it("should return elements for not empty accessible name", async () => {
        const elementDataTestId: string[] = await executeQueryByTag(["button"], false);
        await expect(elementDataTestId).toBeTruthy();
        await expect(elementDataTestId).toEqual([
            "btn-simple",
            "btn-with-empty-arialabel",
            "btn-with-arialabel",
            "btn-with-existing-arialabelledby-and-empty"
        ]);
    });
});
