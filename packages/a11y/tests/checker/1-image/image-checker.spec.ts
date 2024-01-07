import { Browser, Page } from "puppeteer";
import * as path from "path";
import { A11yResultStatus } from "../../../src/lib/model";
import { injectUvvA11YAndLoadUrl } from "../../commons-test";
import { checkTest } from "../ExpectHelper";

describe("1-image", () => {
  let browser: Browser;
  let page: Page;
  async function initA11yOnPage(file: string) {
    const context = await injectUvvA11YAndLoadUrl(path.join(__dirname, file));
    browser = context.browser;
    page = context.page;
  }

  afterEach(async () => {
    await browser?.close();
  });

  async function validateA11y(url: string, enabledRules?: string[]) {
    return await page.evaluate(async (url, enabledRules) => {
      // @ts-ignore
      const rgaaChecker = new uuvA11y.RgaaChecker(url, enabledRules);
      const result = await rgaaChecker.validate().toPromise();
      return {
        result: result,
        summary: result.summary()
      };
    }, url, enabledRules);
  }

  it("1.1 - should find errors", async () => {
    await initA11yOnPage("image-ko.html");
    const { result, summary } = await validateA11y(page.url(), ["1.1"]);
    expect(result.status).toEqual(A11yResultStatus.ERROR);
    const [_1_1_1_TAG, _1_1_1_ROLE, _1_1_2, _1_1_3, _1_1_4, _1_1_5A, _1_1_5B, _1_1_6, _1_1_7, _1_1_8] = result.ruleResults;
    checkTest(_1_1_1_TAG, "1.1.1",
     A11yResultStatus.ERROR,
     [
       "img[data-testid=img-with-custom-role]",
       "img[data-testid=img-with-empty-alt]",
       "img[data-testid=img]",
       "img[data-testid=img-with-aria-labelledby-notExist]",
     ]
    );
    checkTest(_1_1_1_ROLE, "1.1.1",
     A11yResultStatus.ERROR,
     [
       "img[data-testid=img-with-empty-alt]",
       "img[data-testid=img]",
       "img[data-testid=img-with-aria-labelledby-notExist]",
       "div[data-testid=div-with-empty-aria-label]",
       "div[data-testid=div]",
       "div[data-testid=div-with-aria-labelledby-notExist]",
       "svg[data-testid=svg-with-role-and-without-title]"
     ]
    );
    checkTest(_1_1_2, "1.1.2",
     A11yResultStatus.ERROR,
     [
       "area[data-testid=area-href-without-alt]",
     ]
    );
    // checkTest(_1_1_3, "1.1.3",
    //  A11yResultStatus.ERROR,
    //  [
    //   "input[data-testid=img-with-empty-title]",
    //   "input[data-testid=img-with-empty-aria-label]",
    //   "input[data-testid=img-with-aria-labelledby-notExist]",
    //   "input[data-testid=inputimg-without-alt]",
    //   "input[data-testid=img-with-empty-alt]",
    //  ]
    // );
    // checkTest(_1_1_4, "1.1.4",
    //  A11yResultStatus.ERROR,
    //  [
    //  ]
    // );
    checkTest(_1_1_5A, "1.1.5",
     A11yResultStatus.ERROR,
     [
       "svg[data-testid=svg-without-role-image]",
       "svg[data-testid=svg-with-role-and-without-title]",
     ]
    );
    checkTest(_1_1_5B, "1.1.5",
     A11yResultStatus.ERROR,
     [
       "svg[data-testid=svg-without-role-image]",
       "svg[data-testid=svg-without-role-image-and-with-title]",
     ]
    );
    expect(summary).toEqual({
      status: A11yResultStatus.ERROR,
      criteria: {
        "1.1": {
          status: A11yResultStatus.ERROR,
          tests: {
              "1.1.1": {
                  status: A11yResultStatus.ERROR
              },
              "1.1.2": {
                  status: A11yResultStatus.ERROR
              },
              "1.1.3": {
                  status: A11yResultStatus.SUCCESS
              },
              "1.1.4": {
                  status: A11yResultStatus.SUCCESS
              },
              "1.1.5": {
                  status: A11yResultStatus.ERROR
              },
              "1.1.6": {
                  status: A11yResultStatus.SUCCESS
              },
              "1.1.7": {
                  status: A11yResultStatus.SUCCESS
              },
              "1.1.8": {
                  status: A11yResultStatus.SUCCESS
              }
          }
        }
      }
    });
  });

  it("1.1 - should find success", async () => {
    await initA11yOnPage("image-ok.html");
    const { result, summary } = await validateA11y(page.url(), ["1.1"]);
    const [_1_1_1_TAG, _1_1_1_ROLE, _1_1_2, _1_1_3, _1_1_4, _1_1_5A, _1_1_5B, _1_1_6, _1_1_7, _1_1_8] = result.ruleResults;
    checkTest(_1_1_1_TAG, "1.1.1",
     A11yResultStatus.SUCCESS
    );
    checkTest(_1_1_1_ROLE, "1.1.1",
     A11yResultStatus.SUCCESS
    );
    checkTest(_1_1_2, "1.1.2",
     A11yResultStatus.SUCCESS
    );
    // checkTest(_1_1_3, "1.1.3",
    //  A11yResultStatus.SUCCESS
    // );
    // checkTest(_1_1_4, "1.1.4",
    //  A11yResultStatus.SUCCESS
    // );
    checkTest(_1_1_5A, "1.1.5",
     A11yResultStatus.SUCCESS
    );
    checkTest(_1_1_5B, "1.1.5",
     A11yResultStatus.SUCCESS
    );
    checkTest(_1_1_6, "1.1.6",
     A11yResultStatus.SUCCESS
    );
    checkTest(_1_1_7, "1.1.7",
     A11yResultStatus.SUCCESS
    );
    checkTest(_1_1_8, "1.1.8",
     A11yResultStatus.SUCCESS
    );
    expect(result.status).toEqual(A11yResultStatus.SUCCESS);
    expect(summary).toEqual({
      status: A11yResultStatus.SUCCESS,
      criteria: {
        "1.1": {
            status: A11yResultStatus.SUCCESS,
            tests: {
                "1.1.1": {
                    status: A11yResultStatus.SUCCESS
                },
                "1.1.2": {
                    status: A11yResultStatus.SUCCESS
                },
                "1.1.3": {
                    status: A11yResultStatus.SUCCESS
                },
                "1.1.4": {
                    status: A11yResultStatus.SUCCESS
                },
                "1.1.5": {
                    status: A11yResultStatus.SUCCESS
                },
                "1.1.6": {
                    status: A11yResultStatus.SUCCESS
                },
                "1.1.7": {
                    status: A11yResultStatus.SUCCESS
                },
                "1.1.8": {
                    status: A11yResultStatus.SUCCESS
                }
            }
        },
      }
    });
  });
});
