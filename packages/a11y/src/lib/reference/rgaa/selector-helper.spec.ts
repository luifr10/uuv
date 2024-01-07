import { informativeContent } from "./selector-helper";

describe("SelectorHelper", () => {
  test("buildSelectors", () => {
    expect(informativeContent.image.buildSelectorWithAttributes()).toEqual([
      "img[title]",
      "img[aria-labelledby]",
      "img[aria-label]",
      "img[alt]",
    ]);
  });
});
