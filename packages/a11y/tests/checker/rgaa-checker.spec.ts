import { Browser, Page } from "puppeteer";
import { A11yResultStatus, RuleCheckEnum } from "../../src/lib/model";
import { injectUvvA11YAndLoadUrl } from "../commons-test";
import { checkTest } from "./ExpectHelper";

describe("Reference - RGAA", () => {
    let browser: Browser;
    let page: Page;

    beforeEach(async () => {
        const context = await injectUvvA11YAndLoadUrl();
        browser = context.browser;
        page = context.page;
    });

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

    it("should return some results", async () => {
        const { result, summary } = await validateA11y(page.url());
        await expect(result).toBeTruthy();
        await expect(summary).toBeTruthy();
    });

    it("should be ok when only one auto criteria is enabled", async () => {
        const { result, summary } = await validateA11y(page.url(), ["1.1"]);
        const [_1_1_1_TAG, _1_1_1_ROLE, _1_1_2, _1_1_3, _1_1_4, _1_1_5A, _1_1_5B, _1_1_6, _1_1_7, _1_1_8] = result.ruleResults;
        expect(result).toBeTruthy();
        expect(result.status).toEqual(A11yResultStatus.ERROR);
        checkTest(_1_1_1_TAG, "1.1.1",
            A11yResultStatus.ERROR,
            [
                "img[data-testid=img-with-alt]",
                "img[data-testid=img]"
            ]
        );
        checkTest(_1_1_1_ROLE, "1.1.1",
            A11yResultStatus.ERROR,
            [
                "img[data-testid=img-with-alt]",
                "img[data-testid=img]",
                "html > body > main > svg:nth-of-type(3)"
            ]
        );
        checkTest(_1_1_2, "1.1.2",
            A11yResultStatus.ERROR,
            [
                "html > body > main > map:nth-of-type(1) > area:nth-of-type(3)",
                "html > body > main > map:nth-of-type(1) > area:nth-of-type(4)",
                "html > body > main > map:nth-of-type(1) > area:nth-of-type(5)"
            ]
        );
        // checkTest(_1_1_3, "1.1.3",
        //  A11yResultStatus.SUCCESS
        // );
        // checkTest(_1_1_4, "1.1.4",
        //  A11yResultStatus.SUCCESS
        // );
        checkTest(_1_1_5A, "1.1.5",
            A11yResultStatus.ERROR,
            [
                "html > body > main > svg:nth-of-type(1)",
                "html > body > main > svg:nth-of-type(2)",
                "html > body > main > svg:nth-of-type(3)"
            ]
        );
        checkTest(_1_1_5B, "1.1.5",
            A11yResultStatus.ERROR,
            [
                "html > body > main > svg:nth-of-type(1)",
                "html > body > main > svg:nth-of-type(2)"
            ]
        );
        checkTest(_1_1_6, "1.1.6",
            A11yResultStatus.ERROR,
            [
                "html > body > main > object",
                "html > body > main > object > object",
                "html > body > main > object > object > object > object"
            ]
        );
        checkTest(_1_1_7, "1.1.7",
            A11yResultStatus.ERROR,
            [
                "html > body > main > embed:nth-of-type(1)",
                "html > body > main > embed:nth-of-type(2)"
            ]
        );
        checkTest(_1_1_8, "1.1.8",
            A11yResultStatus.SUCCESS
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
                            status: A11yResultStatus.ERROR
                        },
                        "1.1.7": {
                            status: A11yResultStatus.ERROR
                        },
                        "1.1.8": {
                            status: A11yResultStatus.SUCCESS
                        }
                    }
                }
            }
        });
    });

    it("should be ok when only one manual criteria is enabled", async () => {
        const expectedResult = {
            status: A11yResultStatus.MANUAL,
            ruleResults: [
                {
                    status: A11yResultStatus.MANUAL,
                    rule: {
                        check: RuleCheckEnum.MANUAL,
                        criterion: "8.6",
                        description: "if present, title tag must be relevant",
                        elementType: "mandatory - title",
                        help: "adapt this tag content",
                        id: "8.6.1",
                        reference: "RGAA",
                        wcag: "2.4.2 A",
                        shouldNotExist: true
                    },
                    validations: [
                        {
                            criteria: "8.6",
                            errorNodes: [],
                            nodesToCheckManually: [
                                {
                                    attributes: "",
                                    help: "https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/#8.6.1",
                                    html: "<title>Is it revelant ? </title>",
                                    node: {},
                                    selector: "html > body > title:nth-of-type(1)"
                                }
                            ],
                            status: A11yResultStatus.MANUAL
                        }
                    ]
                }
            ]
        };
        const { result, summary } = await validateA11y(page.url(), ["8.6"]);
        expect(result).toBeTruthy();
        expect(result.status).toEqual(A11yResultStatus.MANUAL);
        expect(result).toMatchObject(expectedResult);
        expect(summary).toEqual({
            status: A11yResultStatus.MANUAL,
            criteria: {
                "8.6": {
                    status: A11yResultStatus.MANUAL,
                    tests: {
                        "8.6.1": {
                            status: A11yResultStatus.MANUAL
                        }
                    }
                }
            }
        });
    });
});
