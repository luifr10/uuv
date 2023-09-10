import { CheckActionEnum, TranslateHelper } from "../src/helper/TranslateHelper";

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
  test("translateEngine - with role, name and content", () => {
    expect(TranslateHelper.translateEngine(buttonWithRoleNameAndContent, CheckActionEnum.EXPECT, false)).toEqual(
      ["Then I should see a button named \"myButton\" and containing \"myTextButton\""]);
  });
  test("translateEngine - with role, name", () => {
    expect(TranslateHelper.translateEngine(buttonWithRoleName, CheckActionEnum.EXPECT, false)).toEqual(
      ["Then I should see a button named \"myButton\""]);
  });
  test("translateEngine - with role, name and content disabled", () => {
    expect(TranslateHelper.translateEngine(buttonWithRoleNameAndContent, CheckActionEnum.EXPECT, true)).toEqual(
      ["Then I should see a button named \"myButton\" and containing \"myTextButton\" disabled"]);
  });
  test("translateEngine - with selector- with Id", () => {
    expect(TranslateHelper.translateEngine(selectorWithDataTestId, CheckActionEnum.EXPECT, false)).toEqual(
      ["Then I should see an element with selector \"span[data-testid=spanTestId]\""]);
  });
  test("translateEngine - with selector- with nth", () => {
    expect(TranslateHelper.translateEngine(selectorWithNth, CheckActionEnum.EXPECT, false)).toEqual(
      ["Then I should see an element with selector \"div#myDiv>span:nth-of-type(3)\""]);
  });
});
describe("translateEngine - Within", () => {
  const { buttonWithRoleName, buttonWithRoleNameAndContent, selectorWithDataTestId, selectorWithNth } = dom();
  test("translateEngine - with role, name and content", () => {
    expect(TranslateHelper.translateEngine(buttonWithRoleNameAndContent, CheckActionEnum.WITHIN, false)).toEqual(
      ["When Within a button named \"myButton\""]);
  });
  test("translateEngine - with role, name", () => {
    expect(TranslateHelper.translateEngine(buttonWithRoleName, CheckActionEnum.WITHIN, false)).toEqual(
      ["When Within a button named \"myButton\""]);
  });
  test("translateEngine - with role, name and content disabled", () => {
    expect(TranslateHelper.translateEngine(buttonWithRoleNameAndContent, CheckActionEnum.WITHIN, true)).toEqual(
      ["When Within a button named \"myButton\""]);
  });
  test("translateEngine - with selector- with Id", () => {
    expect(TranslateHelper.translateEngine(selectorWithDataTestId, CheckActionEnum.WITHIN, false)).toEqual(
      ["When Within the element with selector \"span[data-testid=spanTestId]\""]);
  });
  test("translateEngine - with selector- with nth", () => {
    expect(TranslateHelper.translateEngine(selectorWithNth, CheckActionEnum.WITHIN, false)).toEqual(
      ["When Within the element with selector \"div#myDiv>span:nth-of-type(3)\""]);
  });
});

describe("translateEngine - Click", () => {
  const { buttonWithRoleName, buttonWithRoleNameAndContent, selectorWithDataTestId, selectorWithNth } = dom();
  test("translateEngine - with role, name and content", () => {
    expect(TranslateHelper.translateEngine(buttonWithRoleNameAndContent, CheckActionEnum.CLICK, false)).toEqual(
      ["When I click on button named \"myButton\""]);
  });
  test("translateEngine - with role, name", () => {
    expect(TranslateHelper.translateEngine(buttonWithRoleName, CheckActionEnum.CLICK, false)).toEqual(
      ["When I click on button named \"myButton\""]);
  });
  test("translateEngine - with role, name and content disabled", () => {
    expect(TranslateHelper.translateEngine(buttonWithRoleNameAndContent, CheckActionEnum.CLICK, true)).toEqual(
      ["When I click on button named \"myButton\""]);
  });
  test("translateEngine - with selector- with Id", () => {
    expect(TranslateHelper.translateEngine(selectorWithDataTestId, CheckActionEnum.CLICK, false)).toEqual(
      ["When Within the element with selector \"span[data-testid=spanTestId]\"", "Then I click"]);
  });
  test("translateEngine - with selector- with nth", () => {
    expect(TranslateHelper.translateEngine(selectorWithNth, CheckActionEnum.CLICK, false)).toEqual(
      ["When Within the element with selector \"div#myDiv>span:nth-of-type(3)\"", "Then I click"]);
  });
});
