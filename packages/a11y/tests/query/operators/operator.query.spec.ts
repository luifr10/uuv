import { Browser, Page } from "puppeteer";
import { injectUvvA11YAndLoadUrl } from "../../commons-test";
import * as path from "path";

describe("Query - Or Operator", () => {
  let browser: Browser;
  let page: Page;

  beforeEach(async () => {
    const context = await injectUvvA11YAndLoadUrl(path.join(__dirname, "operator-or.html"));
    browser = context.browser;
    page = context.page;
  });

  afterEach(async () => {
    await browser?.close();
  });

  async function executeQuery(tags: string[], role: string, attributes: string[] = []) {
    return await page.evaluate(async (tags: string[], role: string, attributes: string[]) => {
      // @ts-ignore
      const byRoleQuery = new uuvA11y.ByRoleQuery(role, attributes);
      // @ts-ignore
      const byTagQuery = new uuvA11y.ByTagQuery(tags);
      // @ts-ignore
      const orQuery = uuvA11y.OperatorQuery.Or(byRoleQuery, byTagQuery);
      const elements = await orQuery.execute();
      return elements.map(element => element.domNode.getAttribute("data-testid"));
    }, tags, role, attributes);
  }

  it("should return elements with specific tag or role", async () => {
    const elementDataTestId: string[] = await executeQuery(["button[aria-label]"], "img", ["some-attr"]);
    await expect(elementDataTestId).toBeTruthy();
    await expect(elementDataTestId).toEqual(
     [
       "simple-img",
       "div-as-img",
       "button-with-aria-empty",
       "button-with-aria-uuv"
     ]);
  });

  it("should return elements without duplicates", async () => {
    const elementDataTestId: string[] = await executeQuery(["button"], "button");
    await expect(elementDataTestId).toBeTruthy();
    await expect(elementDataTestId).toEqual(
        [
          "button-with-aria-empty",
          "button-with-aria-uuv",
          "button-without-aria",
        ]);
  });
});

describe("Query - And Operator", () => {
  let browser: Browser;
  let page: Page;

  beforeEach(async () => {
    const context = await injectUvvA11YAndLoadUrl(path.join(__dirname, "operator-and.html"));
    browser = context.browser;
    page = context.page;
  });

  afterEach(async () => {
    await browser?.close();
  });

  async function executeQuery(tags: string[], role: string, attributes: string[] = []) {
    return await page.evaluate(async (tags: string[], role: string, attributes: string[]) => {
      // @ts-ignore
      const byRoleQuery = new uuvA11y.ByRoleQuery(role, attributes);
      // @ts-ignore
      const byTagQuery = new uuvA11y.ByTagQuery(tags);
      // @ts-ignore
      const andQuery = uuvA11y.OperatorQuery.And(byRoleQuery, byTagQuery);
      const elements = await andQuery.execute();
      return elements.map(element => element.domNode.getAttribute("data-testid"));
    }, tags, role, attributes);
  }

  it("should return elements with specific tag and role", async () => {
    const elementDataTestId: string[] = await executeQuery(["svg"], "img", ["some-attr"]);
    await expect(elementDataTestId).toBeTruthy();
    await expect(elementDataTestId).toEqual(
     [
       "simple-svg"
     ]);
  });

  it("should not return element", async () => {
    const elementDataTestId: string[] = await executeQuery(["svg"], "img", ["not-exist"]);
    await expect(elementDataTestId).toBeTruthy();
    await expect(elementDataTestId).toEqual(
     [
     ]);
  });
});
