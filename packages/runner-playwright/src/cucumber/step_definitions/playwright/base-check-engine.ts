/**
 * Software Name : UUV
 *
 * SPDX-FileCopyrightText: Copyright (c) Orange SA
 * SPDX-License-Identifier: MIT
 *
 * This software is distributed under the MIT License,
 * see the "LICENSE" file for more details
 *
 * Authors: NJAKO MOLOM Louis Fredice & SERVICAL Stanley
 * Software description: Make test writing fast, understandable by any human
 * understanding English or French.
 */

import { DEFAULT_TIMEOUT, fs, KEY_PRESS } from "@uuv/runner-commons";
import { key } from "@uuv/runner-commons/wording/web";
import { checkA11y, injectAxe } from "axe-playwright";
import { devices, expect } from "@playwright/test";
import { Locator, Page } from "playwright";
import { DataTable, Given, Then, When } from "@cucumber/cucumber";
import {
  addCookie,
  COOKIE_NAME,
  deleteCookieByName,
  FILTER_TYPE,
  findWithRoleAndName,
  findWithRoleAndNameAndContent,
  findWithRoleAndNameAndContentDisable,
  findWithRoleAndNameAndContentEnable,
  findWithRoleAndNameFocused,
  getCookie,
  getPageOrElement,
  MockCookie,
  notFoundWithRoleAndName,
  SelectedElementCookie,
  TimeoutCookie,
  withinRoleAndName,
  getTimeout
} from "./core-engine";
import { World } from "../../preprocessor/run/world";
import { ContextObject, RunOptions } from "axe-core";
import path from "path";

/**
 * key.given.viewport.preset.description
 * */
Given(`${key.given.viewport.preset}`, async function(this: World, viewportPreset: string) {
  await this.page.setViewportSize(devices[viewportPreset].viewport);
});

/**
 * key.given.viewport.withWidthAndHeight.description
 * */
Given(
 `${key.given.viewport.withWidthAndHeight}`, async function
 (this: World, width: number, height: number) {
   await this.page.setViewportSize({ width: width, height: height });
 }
);

/**
 * key.given.keyboard.startNavigationFromTheTop.description
 * */
Given(
 `${key.given.keyboard.startNavigationFromTheTop}`,
 async function(this: World) {
   await this.page.mouse.click(0.5, 0.5);
 }
);

/**
 * key.when.visit.description
 * */
Given(`${key.when.visit}`, { timeout: 60 * 1000 }, async function(this: World, siteUrl: string) {
  await deleteCookieByName(this, COOKIE_NAME.SELECTED_ELEMENT);
  await this.page.goto(`${siteUrl}`);
});

/**
 * key.when.click.withContext.description
 * */
When(`${key.when.click.withContext}`, async function(this: World) {
  const keyBoardFocusTargetObj = keyBoardFocusTarget(this);
  if ((await keyBoardFocusTargetObj.count()) === 1) {
    await keyBoardFocusTargetObj.click({ timeout: DEFAULT_TIMEOUT });
  } else {
    await getPageOrElement(this).then((element: Locator) => element.click({ timeout: DEFAULT_TIMEOUT }));
  }
});

/**
 * key.when.click.button.description
 * */
When(`${key.when.click.button}`, async function(this: World, name: string) {
  await click(this, "button", name);
});

/**
 * key.when.click.withRole.description
 * */
When(`${key.when.click.withRole}`, async function(this: World, role: string, name: string) {
  await click(this, role, name);
});

// TODO : permet de gérer les label accessibles donc pas que les aria : https://playwright.dev/docs/api/class-locator#locator-get-by-label
/**
 * key.when.withinElement.ariaLabel.description
 * */
When(`${key.when.withinElement.ariaLabel}`, async function(this: World, expectedAriaLabel: string) {
  const sanitizedExpectedAriaLabel = encodeURIComponent(expectedAriaLabel).replaceAll("%20", " ");
  await getPageOrElement(this).then(async (element) => expect(element.getByLabel(sanitizedExpectedAriaLabel, { exact: true })).toHaveCount(1, { timeout: await getTimeout(this) }));
  await addCookie(this, COOKIE_NAME.SELECTED_ELEMENT, new SelectedElementCookie(FILTER_TYPE.ARIA_LABEL, sanitizedExpectedAriaLabel));
});

/**
 * key.when.resetContext.description
 * */
When(`${key.when.resetContext}`, async function(this: World) {
  await deleteCookieByName(this, COOKIE_NAME.SELECTED_ELEMENT);
  await deleteCookieByName(this, COOKIE_NAME.TIMEOUT);
});

/**
 * key.when.withinElement.selector.description
 * */
When(`${key.when.withinElement.selector}`, async function(this: World, selector: string) {
  await getPageOrElement(this).then(async (element) => expect(element.locator(selector)).toHaveCount(1, { timeout: await getTimeout(this) }));
  await addCookie(this, COOKIE_NAME.SELECTED_ELEMENT, new SelectedElementCookie(FILTER_TYPE.SELECTOR, selector));
});

/**
 * key.when.type.description
 * */
When(`${key.when.type}`, async function(this: World, textToType: string) {
  const keyBoardFocusTargetObj = keyBoardFocusTarget(this);
  if ((await keyBoardFocusTargetObj.count()) === 1) {
    await keyBoardFocusTargetObj.type(textToType);
  } else {
    await getPageOrElement(this).then(async (element: Locator) => {
      // console.debug(element);
      await element.focus({ timeout: 10000 });
      await element.type(textToType);
    });
  }
});

/**
 * key.when.keyboard.multiplePress.description
 * */
When(`${key.when.keyboard.multiplePress}`, async function(this: World, nbTimes: number, key: string) {
  for (let i = 1; i <= nbTimes; i++) {
    await pressKey(this, key);
  }
});

/**
 * key.when.keyboard.press.description
 * */
When(`${key.when.keyboard.press}`, async function(this: World, key: string) {
  await pressKey(this, key);
});

/**
 * key.when.keyboard.previousElement.description
 * */
When(`${key.when.keyboard.previousElement}`, async function(this: World) {
  await this.page.keyboard.press("ShiftLeft+Tab");
});

/**
 * key.when.keyboard.nextElement.description
 * */
When(`${key.when.keyboard.nextElement}`, async function(this: World) {
  await this.page.keyboard.press("Tab");
});

/**
 * key.when.timeout.description
 * */
When(`${key.when.timeout}`, async function(this: World, newTimeout: number) {
  await addCookie(this, COOKIE_NAME.TIMEOUT, new TimeoutCookie("timeout", newTimeout));
});

/**
 * key.when.withinElement.roleAndName.description
 * */
When(`${key.when.withinElement.roleAndName}`, async function(this: World, role: string, name: string) {
  await withinRoleAndName(this, role, name);
});

/**
 * key.when.withinElement.testId.description
 * */
When(`${key.when.withinElement.testId}`, async function(this: World, testId: string) {
  testId = encodeURIComponent(testId);
  await getPageOrElement(this).then(async (element) => await expect(element.getByTestId(testId)).toHaveCount(1, { timeout: await getTimeout(this) }));
  await addCookie(this, COOKIE_NAME.SELECTED_ELEMENT, new SelectedElementCookie(FILTER_TYPE.TEST_ID, testId));
});

/**
 * key.when.mock.withBody.description
 * */
When(
 `${key.when.mock.withBody}`,
 async function(this: World, verb: string, url: string, name: string, body: any) {
   await addCookie(this, COOKIE_NAME.MOCK_URL, new MockCookie(name, url, verb));
   await this.page.route(url, async route => {
     await route.fulfill({ body });
     await afterMock(this, url, verb, name);
   });
 }
);

/**
 * key.when.mock.withStatusCode.description
 * */
When(
 `${key.when.mock.withStatusCode}`,
 async function(this: World, verb: string, url: string, name: string, statusCode: number) {
   await addCookie(this, COOKIE_NAME.MOCK_URL, new MockCookie(name, url, verb));
   await this.page.route(url, async route => {
     await route.fulfill({ status: statusCode });
     await afterMock(this, url, verb, name);
   });
 }
);

/**
 * key.when.mock.withFixture.description
 * */
When(
 `${key.when.mock.withFixture}`,
 async function(this: World, verb: string, url: string, name: string, fixture: any) {
   await addCookie(this, COOKIE_NAME.MOCK_URL, new MockCookie(name, url, verb));
   const data = fs.readFileSync(path.join(getConfigDir(), `playwright/fixtures/${fixture}`), "utf8");
   await this.page.route(url, async route => {
     await route.fulfill({ body: data });
     await afterMock(this, url, verb, name);

   });
 }
);

/**
 * key.then.element.withSelector.description
 * */
Then(`${key.then.element.withSelector}`, async function(this: World, selector: string) {
  await getPageOrElement(this).then(async (element) => expect(element.locator(selector)).toHaveCount(1, { timeout: await getTimeout(this) }));
});

/**
 * key.when.headers.forUriAndMethod.description
 * */
When(
 `${key.when.headers.forUriAndMethod}`,
 async function(this: World, url: string, method: string, headersToSet: DataTable) {
   await this.page.route(url, async route => {
     const headers = route.request().headers();
     await route.continue({ headers: { ...headers, ...headersToSet.rowsHash() } });
   });
 }
);

/**
 * key.when.headers.forUri.description
 * */
When(
 `${key.when.headers.forUri}`,
 async function(this: World, url: string, headersToSet: DataTable) {
   await this.page.route(url, async route => {
     const headers = route.request().headers();
     await route.continue({ headers: { ...headers, ...headersToSet.rowsHash() } });
   });
 }
);

/**
 * key.then.element.withRoleAndName.description
 * */
Then(`${key.then.element.withRoleAndName}`, async function(this: World, role: string, name: string) {
  await findWithRoleAndName(this, role, name);
});

/**
 * key.then.element.withContent.description
 * */
Then(`${key.then.element.withContent}`, async function(this: World, textContent: string) {
  // TODO partie pris de faire en exactitude. A voir si on doit faire 2 phrases https://playwright.dev/docs/api/class-locator#locator-get-by-text
  await getPageOrElement(this).then(async (element) => expect(element.getByText(textContent, { exact: true })).toHaveCount(1, { timeout: await getTimeout(this) }));
});

/**
 * key.then.element.not.withContent.description
 * */
Then(`${key.then.element.not.withContent}`, async function(this: World, textContent: string) {
  await getPageOrElement(this).then(async (element) => expect(element.getByText(textContent, { exact: true })).toHaveCount(0, { timeout: await getTimeout(this) }));
});

/**
 * key.then.element.withTestId.description
 * */
Then(`${key.then.element.withTestId}`, async function(this: World, testId: string) {
  testId = encodeURIComponent(testId);
  await getPageOrElement(this).then(async (element) => expect(element.getByTestId(testId, { exact: true })).toHaveCount(1, { timeout: await getTimeout(this) }));
});

/**
 * key.then.element.not.withTestId.description
 * */
Then(`${key.then.element.not.withTestId}`, async function(this: World, testId: string) {
  testId = encodeURIComponent(testId);
  await getPageOrElement(this).then(async (element) => expect(element.getByTestId(testId, { exact: true })).toHaveCount(0, { timeout: await getTimeout(this) }));
});

/**
 * key.then.a11y.axecore.default.description
 * */
Then(
 `${key.then.a11y.axecore.default}`,
 async function(this: World) {
   await injectAxe(this.page as Page);
   await checkA11y(this.page as Page);
 });

/**
 * key.then.a11y.axecore.withFixtureOption.description
 * */
Then(
 `${key.then.a11y.axecore.withFixtureOption}`,
 async function(this: World, option: any) {
   await injectAxe(this.page as Page);
   const optionFile = await fs.readFileSync(path.join(getConfigDir(), `playwright/fixtures/${option}`));
   const optionJson = JSON.parse(optionFile.toString());
   await checkA11y(this.page as Page, undefined, {
     axeOptions: optionJson as RunOptions
   });
 });

function getConfigDir(): string {
  // eslint-disable-next-line dot-notation
  return process.env["CONFIG_DIR"] ? process.env["CONFIG_DIR"] : "";
}

/**
 * key.then.a11y.axecore.withFixtureContextAndFixtureOption.description
 * */
Then(
 `${key.then.a11y.axecore.withFixtureContextAndFixtureOption}`,
 async function(this: World, context: any, option: any) {
   await injectAxe(this.page as Page);
   const contextFile = await fs.readFileSync(path.join(getConfigDir(), `playwright/fixtures/${context}`));
   const optionFile = await fs.readFileSync(path.join(getConfigDir(), `playwright/fixtures/${option}`));
   const optionJson = JSON.parse(optionFile.toString());
   await checkA11y(this.page as Page, JSON.parse(contextFile.toString()) as ContextObject, {
     axeOptions: optionJson as RunOptions
   });
 });

/**
 * key.then.a11y.axecore.onlyCritical.description
 * */
Then(
 `${key.then.a11y.axecore.onlyCritical}`,
 async function(this: World) {
   await injectAxe(this.page as Page);
   await checkA11y(this.page as Page, undefined, {
     includedImpacts: ["critical"]
   });
 });

/**
 * key.then.a11y.axecore.withImpacts.description
 * */
Then(
 `${key.then.a11y.axecore.withImpacts}`,
 async function(this: World, impacts: any) {
   await injectAxe(this.page as Page);
   await checkA11y(this.page as Page, undefined, {
     includedImpacts: [impacts]
   });
 });

/**
 * key.then.a11y.axecore.withTags.description
 * */
Then(
 `${key.then.a11y.axecore.withTags}`,
 async function(this: World, tags: any) {
   await injectAxe(this.page as Page);
   await checkA11y(this.page as Page, undefined, {
     axeOptions: {
       runOnly: {
         type: "tag",
         values: [tags]
       }
     }
   });
 });

/**
 * key.then.element.not.withRoleAndName.description
 * */
Then(
 `${key.then.element.not.withRoleAndName}`,
 async function(this: World, role: string, name: string) {
   await notFoundWithRoleAndName(this, role, name);
 }
);

/**
 * key.then.element.withRoleAndNameAndContent.description
 * */
Then(
 `${key.then.element.withRoleAndNameAndContent}`,
 async function(this: World, expectedRole: string, name: string, expectedTextContent: string) {
   await findWithRoleAndNameAndContent(this, expectedRole, name, expectedTextContent);
 }
);

/**
 * key.then.element.withRoleAndNameFocused.description
 * */
Then(
 `${key.then.element.withRoleAndNameFocused}`,
 async function(this: World, expectedRole: string, name: string) {
   await findWithRoleAndNameFocused(this, expectedRole, name);
 }
);

/**
 * key.then.element.withSelectorFocused.description
 * */
Then(
 `${key.then.element.withSelectorFocused}`,
 async function(this: World, selector: string) {
   await getPageOrElement(this).then(async (element) => {
     const locator = element.locator(selector);
     await locator.focus({ timeout: 10000 });
     await expect(locator).toHaveCount(1, { timeout: await getTimeout(this) });
     await expect(locator).toBeFocused();
   });
 });

/**
 * key.then.element.withRoleAndNameAndContentDisabled.description
 * */
Then(
 `${key.then.element.withRoleAndNameAndContentDisabled}`,
 async function(this: World, expectedRole: string, name: string, expectedTextContent: string) {
   await findWithRoleAndNameAndContentDisable(this, expectedRole, name, expectedTextContent);
 }
);

/**
 * key.then.element.withRoleAndNameAndContentEnabled.description
 * */
Then(
 `${key.then.element.withRoleAndNameAndContentEnabled}`,
 async function(this: World, expectedRole: string, name: string, expectedTextContent: string) {
   await findWithRoleAndNameAndContentEnable(this, expectedRole, name, expectedTextContent);
 }
);

/**
 * key.then.element.withAriaLabel.description
 * */
Then(`${key.then.element.withAriaLabel}`, async function(this: World, expectedAriaLabel: string) {
  expectedAriaLabel = encodeURIComponent(expectedAriaLabel);
  await getPageOrElement(this).then(async (element) => expect(element.getByLabel(expectedAriaLabel, { exact: true })).toHaveCount(1, { timeout: await getTimeout(this) }));
});

/**
 * key.then.element.not.withAriaLabel.description
 * */
Then(`${key.then.element.not.withAriaLabel}`, async function(this: World, expectedAriaLabel: string) {
  expectedAriaLabel = encodeURIComponent(expectedAriaLabel);
  await getPageOrElement(this).then(async (element) => expect(element.getByLabel(expectedAriaLabel, { exact: true })).toHaveCount(0, { timeout: await getTimeout(this) }));
});

/**
 * key.then.element.withAriaLabelAndContent.description
 * */
Then(`${key.then.element.withAriaLabelAndContent}`, async function(this: World, expectedAriaLabel: string, expectedTextContent: string) {
  expectedAriaLabel = encodeURIComponent(expectedAriaLabel);
  await getPageOrElement(this).then(async (element) => {
    const byLabel = element.getByLabel(expectedAriaLabel, { exact: true });
    await expect(byLabel).toHaveCount(1, { timeout: await getTimeout(this) });
    await expect(byLabel.filter({ hasText: expectedTextContent })).toHaveCount(1);
  });
});

/**
 * key.then.element.previousWithRoleAndNameFocused.description
 * */
When(`${key.then.element.previousWithRoleAndNameFocused}`, async function(this: World, expectedRole: string, name: string) {
  await this.page.keyboard.press("ShiftLeft+Tab");
  await findWithRoleAndNameFocused(this, expectedRole, name);
});

/**
 * "key.then.element.nextWithRoleAndNameFocused.description
 * */
When(`${key.then.element.nextWithRoleAndNameFocused}`, async function(this: World, expectedRole: string, name: string) {
  await this.page.keyboard.press("Tab");
  await findWithRoleAndNameFocused(this, expectedRole, name);
});


/**
 * key.then.wait.mock.description
 * */
Then(`${key.then.wait.mock}`, async function(this: World, name: string) {
  const cookie = await getCookie(this, COOKIE_NAME.MOCK_URL);
  expect(() => {
    if (!cookie.isValid()) {
      throw new Error(`Mock ${name} must be defined before use this sentence`);
    }
  }).not.toThrow();

  await expect.poll(async () => {
    const cookie = await getCookie(this, COOKIE_NAME.MOCK_URL);
    const mockUrls: MockCookie[] = JSON.parse(cookie.value);
    const mockUrl = mockUrls.find(mock => mock.name === name);
    if (mockUrl) {
      return mockUrl?.isConsumed;
    }
    return false;
  }).toBeDefined();
});

/**
 * key.then.wait.milliSeconds.description
 * */
Then(`${key.then.wait.milliSeconds}`, async function(this: World, ms: number) {
  await this.page.waitForTimeout(ms);
});

/**
 * key.then.attributes.withValues.description
 * */
Then(
 `${key.then.attributes.withValues}`,
 async function(this: World, expectedAttributeList: DataTable) {
   await getPageOrElement(this).then(async (element) => {
     // console.debug("expectedAttributeList.raw(),", expectedAttributeList.raw())
     for (const expectedAttribute of expectedAttributeList.raw()) {
       const attributeName = expectedAttribute[0];
       const attributeValue = expectedAttribute[1];
       // await showAttributesInLocator(element);
       await expect(element).toHaveAttribute(attributeName, attributeValue);
     }
   });
 }
);

/**
 * key.then.list.withNameAndContent.description
 * */
Then(
 `${key.then.list.withNameAndContent}`,
 async function(this: World, expectedListName: string, expectedElementsOfList: DataTable) {
   await withinRoleAndName(this, "list", expectedListName);
   await getPageOrElement(this).then(async (element) => {
     const listitem = await element.getByRole("listitem", { exact: true }).all();
     const foundedElement: any[] = [];
     for (const element of listitem) {
       const textContent = await element.textContent();
       foundedElement.push([textContent]);
     }
     await expect(foundedElement.length).toBeGreaterThan(0);
     // console.debug(`expected [${expectedElementsOfList.raw()}] to be [${foundedElement}]`);
     await expect(listitem.length).toEqual(expectedElementsOfList.raw().length);
     await expect(foundedElement).toEqual(expectedElementsOfList.raw());
   });
 }
);

async function pressKey(world: World, key: string) {
  switch (key) {
    case KEY_PRESS.TAB:
      await world.page.keyboard.press("Tab");
      break;
    case KEY_PRESS.REVERSE_TAB:
      await world.page.keyboard.press("ShiftLeft+Tab");
      break;
    case KEY_PRESS.UP:
      await world.page.keyboard.press("ArrowUp");
      break;
    case KEY_PRESS.DOWN:
      await world.page.keyboard.press("ArrowDown");
      break;
    case KEY_PRESS.LEFT:
      await world.page.keyboard.press("ArrowLeft");
      break;
    case KEY_PRESS.RIGHT:
      await world.page.keyboard.press("ArrowRight");
      break;
    default:
      console.error("the command" + key + " is unrecognized.");
      break;
  }
  await deleteCookieByName(world, COOKIE_NAME.SELECTED_ELEMENT);
  await addCookie(world, COOKIE_NAME.SELECTED_ELEMENT, new SelectedElementCookie(FILTER_TYPE.SELECTOR_PARENT, "*:focus"));
}

async function click(world: World, role: any, name: string) {
  await getPageOrElement(world).then(async (element) => {
    const byRole = element.getByRole(role, {
      name: name,
      exact: true
    });
    await expect(byRole).toHaveCount(1, { timeout: await getTimeout(world) });
    await byRole.click();
    await world.page.waitForLoadState();
    await deleteCookieByName(world, COOKIE_NAME.SELECTED_ELEMENT);
  });
}

function keyBoardFocusTarget(world: World) {
  return world.page.locator(":focus");
}

async function setMockAsConsumed(name: string, mock: MockCookie, world: World<any>) {
  const newMockCookie = new MockCookie(name, mock.url, mock.verb);
  newMockCookie.isConsumed = true;
  await addCookie(world, COOKIE_NAME.MOCK_URL, newMockCookie);
}

async function afterMock(world: World, url: string, verb: string, name: string) {
  await world.page.waitForResponse(url);
  const cookie = await getCookie(world, COOKIE_NAME.MOCK_URL);
  const mockCookie: MockCookie[] = JSON.parse(cookie.value);
  for (const mock of mockCookie) {
    if (mock.name === name && mock.verb === verb && mock.url === url) {
      await setMockAsConsumed(name, mock, world);
    }
  }
}
