import { Browser, Page } from "puppeteer";
import { injectUvvA11YAndLoadUrl } from "../../commons-test";
import * as path from "path";
import { AccessibleNameQuery, BySiblingQuery, ByTagQuery, OperatorQuery, QueryResult } from "../../../src";
import { informativeContent } from "../../../src/lib/reference/rgaa/selector-helper";

describe("Query - BySibling", () => {
    let browser: Browser;
    let page: Page;

    afterEach(async () => {
        await browser?.close();
    });

    async function executeQuery(selector: string[], shouldBeFound: boolean, siblingTags: string[]) {
        return await page.evaluate(async (selector: string[], shouldBeFound: boolean, siblingTags: string[]) => {
            // @ts-ignore
            const subQuery = new uuvA11y.ByTagQuery(selector);
            // @ts-ignore
            const bySiblingQuery = new uuvA11y.BySiblingQuery(subQuery, shouldBeFound, siblingTags);
            const elements = await bySiblingQuery.execute();
            return elements.map((element: QueryResult) => {
                const linked: HTMLElement[] = element.linkedNodes;
                return {
                    domNode: element.domNode.getAttribute("data-testid"),
                    linked: linked.map((node: HTMLElement) => node.getAttribute("data-testid"))
                };
            });
        }, selector, shouldBeFound, siblingTags);
    }

    it("should return elements with sibling 'button' or 'a' when htmlElement is focusable", async () => {
        const context = await injectUvvA11YAndLoadUrl(path.join(__dirname, "by-sibling_img.html"));
        browser = context.browser;
        page = context.page;
        const elementDataTestId: string[] = await executeQuery(["img"], true, ["button", "a"]);
        await expect(elementDataTestId).toBeTruthy();
        await expect(elementDataTestId).toEqual([
            { domNode: "img", linked: ["link-after"] },
            { domNode: "uuv-link-before", linked: ["link-before", "button"] },
            { domNode: "uuv-link-2", linked: ["link-before", "button"] },
            { domNode: "img-button2", linked: ["button", "button-after"] },
            { domNode: "uuv-button-before", linked: ["button-before", "another-button"] },
            { domNode: "uuv-link-not-exist", linked: ["another-button"] },
        ]);
    });

    it("should return elements without sibling 'button' or 'a' when htmlElement is focusable", async () => {
        const context = await injectUvvA11YAndLoadUrl(path.join(__dirname, "by-sibling_img.html"));
        browser = context.browser;
        page = context.page;
        const elementDataTestId: string[] = await executeQuery(["img"], false, ["button", "a"]);
        await expect(elementDataTestId).toBeTruthy();
        await expect(elementDataTestId).toEqual([
            { domNode: "img-not-available", linked: ["input-a", "input-b"] }
        ]);
    });

    it("should return elements with sibling 'button' or 'a' when htmlElement is not focusable", async () => {
        const context = await injectUvvA11YAndLoadUrl(path.join(__dirname, "by-sibling_input_reset.html"));
        browser = context.browser;
        page = context.page;
        const elementDataTestId: string[] = await executeQuery(["input[type=reset]"], true, ["button", "a"]);
        await expect(elementDataTestId).toBeTruthy();
        await expect(elementDataTestId).toEqual([
            { domNode: "input", linked: ["link-after"] },
            { domNode: "uuv-link-before", linked: ["link-before", "link_allowed"] },
            { domNode: "uuv-link-2", linked: ["link_allowed", "button"] },
            { domNode: "input-button2", linked: ["button", "button-after"] },
            { domNode: "uuv-button-before", linked: ["button-before", "another-button"] },
            { domNode: "uuv-link-not-exist", linked: ["another-button"] },
        ]);
    });

    it("should return elements without sibling 'button' or 'a' when htmlElement is not focusable", async () => {
        const context = await injectUvvA11YAndLoadUrl(path.join(__dirname, "by-sibling_input_reset.html"));
        browser = context.browser;
        page = context.page;
        const elementDataTestId: string[] = await executeQuery(["input[type=reset]"], false, ["button", "a"]);
        await expect(elementDataTestId).toBeTruthy();
        await expect(elementDataTestId).toEqual([
            { domNode: "input-not-available", linked: ["input-a", "input-b"] },
        ]);
    });
});
