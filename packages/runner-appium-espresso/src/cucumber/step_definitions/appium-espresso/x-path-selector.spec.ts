import { XpathSelector } from "./xpath-selector";
import { expect } from "@jest/globals";

describe("XpathSelector", () => {
    it("should throws error when no role specified", function () {
        const selector = new XpathSelector();
        expect(() => selector.asString()).toThrow(new Error("No role specified for the selector"));
    });

    it("should returns correct string when role is specified", function () {
        const selector = new XpathSelector()
            .withRole("ComposeNode");
        expect(selector.asString()).toEqual("//ComposeNode");
    });

    it("should returns correct string when role and attributes are specified", function () {
        const selector = new XpathSelector()
            .withRole("ComposeNode")
            .withAttribute("attr1", "value1")
            .withAttribute("attr2", "value2");
        expect(selector.asString()).toEqual("//ComposeNode[@attr1=\"value1\" and @attr2=\"value2\"]");
    });

    it("should returns correct string when role, attributes and child are specified", function () {
        const selector = new XpathSelector()
            .withRole("ComposeNode")
            .withAttribute("attr1", "value1")
            .withAttribute("attr2", "value2")
            .withChild(
                new XpathSelector()
                    .withRole("Text")
                    .withAttribute("attr3", "value3")
            );
        expect(selector.asString()).toEqual("//ComposeNode[@attr1=\"value1\" and @attr2=\"value2\"]/Text[@attr3=\"value3\"]");
    });
});
