import { Browser, Page } from "puppeteer";
import * as path from "path";
import { A11yResultStatus } from "../../../src/lib/model";
import { injectUvvA11YAndLoadUrl } from "../../commons-test";
import { checkTest } from "../ExpectHelper";

describe("5-table", () => {
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

    it("5.1 should return results", async () => {
        await initA11yOnPage("table.html");
        const { result, summary } = await validateA11y(page.url(), ["5.1"]);
        expect(result.status).toEqual(A11yResultStatus.ERROR);
        const [_5_1_1_TAG, _5_1_1_ROLE] = result.ruleResults;
        // Caption inside element different of table is not detected
        checkTest(_5_1_1_TAG, "5.1.1",
            A11yResultStatus.ERROR,
            [
                "table[data-testid=table]",
                "table[data-testid=table-with-caption-empty] > caption:nth-of-type(1)",
                "table[data-testid=table-with-aria-describedby-not-existing]",
                "table[data-testid=table-with-aria-labelledby-existing]",
                "table[data-testid=table-with-aria-labelledby-not-existing]",
                "table[data-testid=table-with-aria-label-empty]",
                "table[data-testid=table-with-aria-label]",
                "table[data-testid=table-with-role-presentation]"
            ]
        );
        checkTest(_5_1_1_ROLE, "5.1.1",
            A11yResultStatus.ERROR,
            [
                "div[data-testid=div-with-role-table]",
                "div[data-testid=div-with-role-table-and-caption]",
                "div[data-testid=div-with-role-table-and-caption-empty]",
                "div[data-testid=div-with-aria-describedby-not-existing]",
                "div[data-testid=div-with-aria-labelledby-not-existing]",
                "div[data-testid=div-with-aria-labelledby-existing]",
                "div[data-testid=div-with-aria-label-empty]",
                "div[data-testid=div-with-aria-label]",
            ]
        );
        expect(summary).toEqual({
            status: A11yResultStatus.ERROR,
            criteria: {
                "5.1": {
                    status: A11yResultStatus.ERROR,
                    tests: expect.objectContaining({
                        "5.1.1": {
                            status: A11yResultStatus.ERROR
                        }
                    })
                }
            }
        });
    });

    it("5.2 should return results", async () => {
        await initA11yOnPage("table.html");
        const { result, summary } = await validateA11y(page.url(), ["5.2"]);
        expect(result.status).toEqual(A11yResultStatus.MANUAL);
        const [_5_2_1] = result.ruleResults;
        // Caption inside element different of table is not detected
        checkTest(_5_2_1, "5.2.1",
            A11yResultStatus.MANUAL,
            [],
            [
                "table[data-testid=table-with-summary]",
                "table[data-testid=table-with-caption] > caption:nth-of-type(1)",
                "table[data-testid=table-with-aria-describedby-not-existing]",
                "table[data-testid=table-with-aria-describedby-existing]",
                "div[data-testid=div-with-aria-describedby-not-existing]",
                "div[data-testid=div-with-aria-describedby-existing]"
            ]
        );
        expect(summary).toEqual({
            status: A11yResultStatus.MANUAL,
            criteria: {
                "5.2": {
                    status: A11yResultStatus.MANUAL,
                    tests: expect.objectContaining({
                        "5.2.1": {
                            status: A11yResultStatus.MANUAL
                        }
                    })
                }
            }
        });
    });

    it("5.3 should return results", async () => {
        await initA11yOnPage("table.html");
        const { result, summary } = await validateA11y(page.url(), ["5.3"]);
        expect(result.status).toEqual(A11yResultStatus.MANUAL);
        const [_5_3_1] = result.ruleResults;
        checkTest(_5_3_1, "5.3.1",
            A11yResultStatus.MANUAL,
            [],
            [
                "table[data-testid=table-with-role-presentation]"
            ]
        );
        expect(summary).toEqual({
            status: A11yResultStatus.MANUAL,
            criteria: {
                "5.3": {
                    status: A11yResultStatus.MANUAL,
                    tests: expect.objectContaining({
                        "5.3.1": {
                            status: A11yResultStatus.MANUAL
                        }
                    })
                }
            }
        });
    });

    it("5.4 should return results", async () => {
        await initA11yOnPage("table.html");
        const { result, summary } = await validateA11y(page.url(), ["5.4"]);
        expect(result.status).toEqual(A11yResultStatus.ERROR);
        const [_5_4_1] = result.ruleResults;
        checkTest(_5_4_1, "5.4.1",
            A11yResultStatus.ERROR,
            [
                "table[data-testid=table]",
                "table[data-testid=table-with-summary]",
                "table[data-testid=table-with-caption-empty] > caption:nth-of-type(1)",
                "table[data-testid=table-with-aria-describedby-not-existing]",
                "table[data-testid=table-with-aria-describedby-existing]",
                "table[data-testid=table-with-aria-labelledby-not-existing]",
                "table[data-testid=table-with-aria-label-empty]",
                "div[data-testid=div-with-role-table]",
                "div[data-testid=div-with-role-table-and-caption]",
                "div[data-testid=div-with-role-table-and-caption-empty]",
                "div[data-testid=div-with-aria-describedby-not-existing]",
                "div[data-testid=div-with-aria-describedby-existing]",
                "div[data-testid=div-with-aria-labelledby-not-existing]",
                "div[data-testid=div-with-aria-label-empty]"
            ],
        );
        expect(summary).toEqual({
            status: A11yResultStatus.ERROR,
            criteria: {
                "5.4": {
                    status: A11yResultStatus.ERROR,
                    tests: expect.objectContaining({
                        "5.4.1": {
                            status: A11yResultStatus.ERROR
                        }
                    })
                }
            }
        });
    });

    it("5.5 should return results", async () => {
        await initA11yOnPage("table.html");
        const { result, summary } = await validateA11y(page.url(), ["5.5"]);
        expect(result.status).toEqual(A11yResultStatus.MANUAL);
        const [_5_5_1] = result.ruleResults;
        checkTest(_5_5_1, "5.5.1",
            A11yResultStatus.MANUAL,
            [],
            [
                "table[data-testid=table-with-caption] > caption:nth-of-type(1)",
                "table[data-testid=table-with-aria-labelledby-existing]",
                "table[data-testid=table-with-aria-labelledby-not-existing]",
                "table[data-testid=table-with-aria-label]",
                "div[data-testid=div-with-aria-labelledby-not-existing]",
                "div[data-testid=div-with-aria-labelledby-existing]",
                "div[data-testid=div-with-aria-label]",
            ],
        );
        expect(summary).toEqual({
            status: A11yResultStatus.MANUAL,
            criteria: {
                "5.5": {
                    status: A11yResultStatus.MANUAL,
                    tests: expect.objectContaining({
                        "5.5.1": {
                            status: A11yResultStatus.MANUAL
                        }
                    })
                }
            }
        });
    });
});
