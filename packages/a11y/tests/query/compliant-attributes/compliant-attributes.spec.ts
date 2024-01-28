import { Browser, Page } from "puppeteer";
import { injectUvvA11YAndLoadUrl } from "../../commons-test";
import * as path from "path";

describe("Query - CompliantAttributes", () => {
    let browser: Browser;
    let page: Page;

    beforeEach(async () => {
        const context = await injectUvvA11YAndLoadUrl(path.join(__dirname, "compliant-attributes.html"));
        browser = context.browser;
        page = context.page;
    });

    afterEach(async () => {
        await browser?.close();
    });

    async function executeCompliantAttributesQuery(selectors: string[]) {
        return await page.evaluate(async (selectors) => {
            // @ts-ignore
            const subQuery = new uuvA11y.ByTagQuery(selectors);
            const compliantAttributes = [];
            // @ts-ignore
            compliantAttributes.push(new uuvA11y.CompliantSpecification("alt", new uuvA11y.EmptyAttributeSpecification()));
            // @ts-ignore
            compliantAttributes.push(new uuvA11y.CompliantSpecification("aria-label", new uuvA11y.EmptyAttributeSpecification()));
            // @ts-ignore
            compliantAttributes.push(new uuvA11y.CompliantSpecification("title", new uuvA11y.EmptyAttributeSpecification()));
            // @ts-ignore
            compliantAttributes.push(new uuvA11y.CompliantSpecification("aria-labelledBy", new uuvA11y.EmptyElementWithIdSpecification()));
            // @ts-ignore
            const compliantAttributesQuery = new uuvA11y.CompliantAttributesQuery(subQuery, compliantAttributes);
            const elements = await compliantAttributesQuery.execute();
            return elements.map(element => element.domNode.getAttribute("data-testid"));
        }, selectors);
    }

    async function executeNotUniqueIdQuery(selectors: string[]) {
        return await page.evaluate(async (selectors) => {
            // @ts-ignore
            const subQuery = new uuvA11y.ByTagQuery(selectors);
            // @ts-ignore
            const compliantAttributesQuery = new uuvA11y.CompliantAttributesQuery(subQuery, [
                // @ts-ignore
                new uuvA11y.CompliantSpecification("id", new uuvA11y.NotUniqueIdAttributeSpecification())
            ]);
            const elements = await compliantAttributesQuery.execute();
            return elements.map(element => element.domNode.getAttribute("data-testid"));
        }, selectors);
    }

    async function executeNotEqualsQuery(selectors: string[]) {
        return await page.evaluate(async (selectors) => {
            // @ts-ignore
            const subQuery = new uuvA11y.ByTagQuery(selectors);
            // @ts-ignore
            const compliantAttributesQuery = new uuvA11y.CompliantAttributesQuery(subQuery, [
                // @ts-ignore
                new uuvA11y.CompliantSpecification("custom-attr", new uuvA11y.NotEqualsAttributeSpecification(["maybye"]))
            ]);
            const elements = await compliantAttributesQuery.execute();
            return elements.map(element => element.domNode.getAttribute("data-testid"));
        }, selectors);
    }

    async function executeEqualsQuery(selectors: string[]) {
        return await page.evaluate(async (selectors) => {
            // @ts-ignore
            const subQuery = new uuvA11y.ByTagQuery(selectors);
            // @ts-ignore
            const compliantAttributesQuery = new uuvA11y.CompliantAttributesQuery(subQuery, [
                // @ts-ignore
                new uuvA11y.CompliantSpecification("custom-attr", new uuvA11y.EqualsAttributeSpecification(["maybye"]))
            ]);
            const elements = await compliantAttributesQuery.execute();
            return elements.map(element => element.domNode.getAttribute("data-testid"));
        }, selectors);
    }

    it("should return elements for not empty accessible name", async () => {
        const elementDataTestId: string[] = await executeCompliantAttributesQuery(["input[type=image]"]);
        await expect(elementDataTestId).toBeTruthy();
        await expect(elementDataTestId).toEqual([
            "inputimg-without-alt",
            "img-with-empty-alt",
            "img-with-empty-title",
            "img-with-empty-aria-label",
            "img-with-aria-labelledby-notExist",
            "inputimg-empty-aria-labelledby",
        ]);
    });

    it("should return elements for not unique id", async () => {
        const elementDataTestId: string[] = await executeNotUniqueIdQuery(["[data-testid=not-unique-id], [data-testid=unique-id]"]);
        await expect(elementDataTestId).toBeTruthy();
        await expect(elementDataTestId).toEqual([
            "not-unique-id",
        ]);
    });

    it("should return elements for not equals attribute", async () => {
        const elementDataTestId: string[] = await executeNotEqualsQuery(["[data-testid=not-unique-id], [data-testid=unique-id]"]);
        await expect(elementDataTestId).toBeTruthy();
        await expect(elementDataTestId).toEqual([
            "unique-id",
        ]);
    });

    it("should return elements for equals attribute", async () => {
        const elementDataTestId: string[] = await executeEqualsQuery(["[data-testid=not-unique-id], [data-testid=unique-id]"]);
        await expect(elementDataTestId).toBeTruthy();
        await expect(elementDataTestId).toEqual([
            "not-unique-id",
        ]);
    });
});
