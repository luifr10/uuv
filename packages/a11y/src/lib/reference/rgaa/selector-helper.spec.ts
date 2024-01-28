import { informativeContent, siblingElement, table } from "./selector-helper";

describe("SelectorHelper", () => {
  test("buildSelectorsWithAttributes", () => {
    expect(informativeContent.image.buildSelectorWithAttributes()).toEqual([
      "img[title]",
      "img[aria-labelledby]",
      "img[aria-label]",
      "img[alt]"
    ]);
  });
  test("buildSelector with empty attributes", () => {
    expect(siblingElement.a.buildSelectorWithAttributes()).toEqual([
      "a[href]"
    ]);
  });
  test("buildSelectors with override selector", () => {
    expect(table.noCaption.buildSelector(["img"])).toEqual([
      "img:not(:has(> caption))",
      "img:has(> caption:empty)",
      "[role=img]:not(:has(> caption))",
      "[role=img]:has(> caption:empty)"
    ]);
  });
  test("buildSelectors with override mutiple selectors and role", () => {
    expect(table.noCaption.buildSelector(["table[role=presentation]", "table[summary]"], "table")).toEqual([
      "table[role=presentation]:not(:has(> caption))",
      "table[role=presentation]:has(> caption:empty)",
      "table[summary]:not(:has(> caption))",
      "table[summary]:has(> caption:empty)",
      "[role=table]:not(:has(> caption))",
      "[role=table]:has(> caption:empty)"
    ]);
  });
  test("buildSelectors with override multiple selectors", () => {
    expect(table.noCaption.buildSelector(["table[role=presentation]", "table[summary]"], "")).toEqual([
      "table[role=presentation]:not(:has(> caption))",
      "table[role=presentation]:has(> caption:empty)",
      "table[summary]:not(:has(> caption))",
      "table[summary]:has(> caption:empty)"
    ]);
  });
});
