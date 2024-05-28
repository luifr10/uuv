import { TranslateHelper } from "../src/helper/TranslateHelper";
import { ActionEnum } from "../src/Commons";

function dom() {
  const rootElement = document.createElement("div");
  rootElement.id = "myDiv";
  const buttonWithRoleName = document.createElement("button");
  buttonWithRoleName.id = "myButtonCustom";
  buttonWithRoleName.setAttribute("aria-label", "myButton");
  const buttonWithRoleNameAndContent = document.createElement("button");
  buttonWithRoleNameAndContent.id = "myButton";
  buttonWithRoleNameAndContent.textContent = "myTextButton";
  buttonWithRoleNameAndContent.setAttribute("aria-label", "myButton");
  const selectorWithId = document.createElement("span");
  selectorWithId.id = "mySpan";
  selectorWithId.textContent = "myTextSpan2";
  rootElement.appendChild(selectorWithId);
  const selectorWithDataTestId = document.createElement("span");
  selectorWithDataTestId.textContent = "myTextSpan";
  selectorWithDataTestId.setAttribute("data-testid", "spanTestId");
  rootElement.appendChild(selectorWithDataTestId);
  const selectorWithNth = document.createElement("span");
  selectorWithNth.textContent = "myTextSpan3";
  rootElement.appendChild(selectorWithNth);
  document.body.appendChild(rootElement);
  return { buttonWithRoleName, buttonWithRoleNameAndContent, selectorWithDataTestId, selectorWithNth };
}

describe("translateEngine - Expected", () => {
  const { buttonWithRoleName, buttonWithRoleNameAndContent, selectorWithDataTestId, selectorWithNth } = dom();
  test("translateEngine - with role, name and content", async () => {
    expect(await TranslateHelper.translateEngine(buttonWithRoleNameAndContent, ActionEnum.EXPECT, false)).toEqual(
        { "sentences": ["Then I should see a button named \"myButton\" and containing \"myTextButton\""] });
  });
  test("translateEngine - with role, name", async () => {
    expect(await TranslateHelper.translateEngine(buttonWithRoleName, ActionEnum.EXPECT, false)).toEqual(
        { "sentences": ["Then I should see a button named \"myButton\""] });
  });
  test("translateEngine - with role, name and content disabled", async () => {
    expect(await TranslateHelper.translateEngine(buttonWithRoleNameAndContent, ActionEnum.EXPECT, true)).toEqual(
        { "sentences": ["Then I should see a button named \"myButton\" and containing \"myTextButton\" disabled"] });
  });
  test("translateEngine - with selector- with Id", async () => {
    expect(await TranslateHelper.translateEngine(selectorWithDataTestId, ActionEnum.EXPECT, false)).toEqual(
        { "sentences": ["Then I should see an element with selector \"span[data-testid=spanTestId]\""],
          suggestion: {
            accessibleAttribute: "",
            accessibleValue: "",
            code: "",
            sentenceAfterCorrection: []
          }
        });
  });
  test("translateEngine - with selector- with nth", async () => {
    expect(await TranslateHelper.translateEngine(selectorWithNth, ActionEnum.EXPECT, false)).toEqual(
        { "sentences": ["Then I should see an element with selector \"div#myDiv > span:nth-of-type(3)\""],
          suggestion: {
            accessibleAttribute: "",
            accessibleValue: "",
            code: "",
            sentenceAfterCorrection: []
          }
        });
  });
});
describe("translateEngine - Within", () => {
  const { buttonWithRoleName, buttonWithRoleNameAndContent, selectorWithDataTestId, selectorWithNth } = dom();
  test("translateEngine - with role, name and content", async () => {
    expect(await TranslateHelper.translateEngine(buttonWithRoleNameAndContent, ActionEnum.WITHIN, false)).toEqual(
        { "sentences": ["When within a button named \"myButton\""] });
  });
  test("translateEngine - with role, name", async () => {
    expect(await TranslateHelper.translateEngine(buttonWithRoleName, ActionEnum.WITHIN, false)).toEqual(
        { "sentences": ["When within a button named \"myButton\""] });
  });
  test("translateEngine - with role, name and content disabled", async () => {
    expect(await TranslateHelper.translateEngine(buttonWithRoleNameAndContent, ActionEnum.WITHIN, true)).toEqual(
        { "sentences": ["When within a button named \"myButton\""] });
  });
  test("translateEngine - with selector- with Id", async () => {
    expect(await TranslateHelper.translateEngine(selectorWithDataTestId, ActionEnum.WITHIN, false)).toEqual(
        { "sentences": ["When within the element with selector \"span[data-testid=spanTestId]\""],
          suggestion: {
            accessibleAttribute: "",
            accessibleValue: "",
            code: "",
            sentenceAfterCorrection: []
          }
        });
  });
  test("translateEngine - with selector- with nth", async () => {
    expect(await TranslateHelper.translateEngine(selectorWithNth, ActionEnum.WITHIN, false)).toEqual(
        { "sentences": ["When within the element with selector \"div#myDiv > span:nth-of-type(3)\""],
          suggestion: {
            accessibleAttribute: "",
            accessibleValue: "",
            code: "",
            sentenceAfterCorrection: []
          }
        });
  });
});

describe("translateEngine - Click", () => {
  const { buttonWithRoleName, buttonWithRoleNameAndContent, selectorWithDataTestId, selectorWithNth } = dom();
  test("translateEngine - with role, name and content", async () => {
    expect(await TranslateHelper.translateEngine(buttonWithRoleNameAndContent, ActionEnum.CLICK, false)).toEqual(
        { "sentences": ["When I click on button named \"myButton\""] });
  });
  test("translateEngine - with role, name", async () => {
    expect(await TranslateHelper.translateEngine(buttonWithRoleName, ActionEnum.CLICK, false)).toEqual(
        { "sentences": ["When I click on button named \"myButton\""] });
  });
  test("translateEngine - with role, name and content disabled", async () => {
    expect(await TranslateHelper.translateEngine(buttonWithRoleNameAndContent, ActionEnum.CLICK, true)).toEqual(
        { "sentences": ["When I click on button named \"myButton\""] });
  });
  test("translateEngine - with selector- with Id", async () => {
    expect(await TranslateHelper.translateEngine(selectorWithDataTestId, ActionEnum.CLICK, false)).toEqual(
        { "sentences": ["When within the element with selector \"span[data-testid=spanTestId]\"", "Then I click"],
          suggestion: {
            accessibleAttribute: "",
            accessibleValue: "",
            code: "",
            sentenceAfterCorrection: []
          }
        });
  });
  test("translateEngine - with selector- with nth", async () => {
    expect(await TranslateHelper.translateEngine(selectorWithNth, ActionEnum.CLICK, false)).toEqual(
        { "sentences": ["When within the element with selector \"div#myDiv > span:nth-of-type(3)\"", "Then I click"],
          suggestion: {
            accessibleAttribute: "",
            accessibleValue: "",
            code: "",
            sentenceAfterCorrection: []
          }
        });
  });
});
describe("translateEngine - keyboard", () => {
  const { selectorWithNth, buttonWithRoleName } = dom();
  test("translateEngine - focus - with selector", async () => {
    expect(await TranslateHelper.translateEngine(selectorWithNth, ActionEnum.KEYBOARD_GLOBAL_NAVIGATION, false)).toEqual(
        { "sentences": ["Then the element with selector \"div#myDiv > span:nth-of-type(3)\" should be keyboard focused"],
          suggestion: {
            accessibleAttribute: "",
            accessibleValue: "",
            code: "",
            sentenceAfterCorrection: []
          }
        });
  });

  test("translateEngine - focus - with role and name", async () => {
    expect(await TranslateHelper.translateEngine(buttonWithRoleName, ActionEnum.KEYBOARD_GLOBAL_NAVIGATION, false)).toEqual(
        { "sentences": ["Then I should see a button named \"myButton\" keyboard focused"] });
  });
});
