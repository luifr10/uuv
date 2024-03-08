import { Browser, Page } from "puppeteer";
import * as path from "path";
import { A11yResultStatus } from "../../../src";
import { injectUvvA11YAndLoadUrl } from "../../commons-test";
import { checkTest } from "../ExpectHelper";

describe("9-structure", () => {
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

    it("9.1 should return results", async () => {
        await initA11yOnPage("structure.html");
        const { result, summary } = await validateA11y(page.url(), ["9.1"]);
        expect(result.status).toEqual(A11yResultStatus.MANUAL);
        const [_9_1_1_MANUAL, _9_1_2_MANUAL, _9_1_3_MANUAL] = result.ruleResults;

        const allHeading = [
            "h1[data-testid=title-with-tag-h1]",
            "div[data-testid=title-with-role-h1]",
            "h2[data-testid=title-with-tag-h2]",
            "div[data-testid=title-with-role-h2]",
            "h3[data-testid=title-with-tag-h3]",
            "div[data-testid=title-with-role-h3]",
            "h4[data-testid=title-with-tag-h4]",
            "div[data-testid=title-with-role-h4]",
            "h5[data-testid=title-with-tag-h5]",
            "div[data-testid=title-with-role-h5]",
            "h6[data-testid=title-with-tag-h6]",
            "div[data-testid=title-with-role-h6]"
        ];

        checkTest(
            _9_1_1_MANUAL,
            "9.1.1",
            A11yResultStatus.MANUAL,
            [],
            [
                ...allHeading,
            ]
        );

        checkTest(
            _9_1_2_MANUAL,
            "9.1.2",
            A11yResultStatus.MANUAL,
            [],
            [
                ...allHeading,
            ]
        );

        checkTest(
            _9_1_3_MANUAL,
            "9.1.3",
            A11yResultStatus.MANUAL,
            [],
            [
                "html",
            ]
        );

        expect(summary).toEqual({
            status: A11yResultStatus.MANUAL,
            criteria: {
                "9.1": {
                    status: A11yResultStatus.MANUAL,
                    tests: {
                        "9.1.1": {
                            status: A11yResultStatus.MANUAL
                        },
                        "9.1.2": {
                            status: A11yResultStatus.MANUAL
                        },
                        "9.1.3": {
                            status: A11yResultStatus.MANUAL
                        }
                    }
                }
            }
        });
    });
});
