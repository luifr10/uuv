/**
 * Software Name : UUV
 *
 * SPDX-FileCopyrightText: Copyright (c) 2022-2024 Orange
 * SPDX-License-Identifier: MIT
 *
 * This software is distributed under the MIT License,
 * the text of which is available at https://spdx.org/licenses/MIT.html
 * or see the "LICENSE" file for more details.
 *
 * Authors: NJAKO MOLOM Louis Fredice & SERVICAL Stanley
 * Software description: Make test writing fast, understandable by any human
 * understanding English or French.
 */

import { DEFAULT_TIMEOUT, fs, KEY_PRESS } from "@uuv/runner-commons";
import { key } from "@uuv/runner-commons/wording/web";
import { checkA11y, injectAxe } from "axe-playwright";
import { devices, expect } from "@playwright/test";
import { Page, Locator } from "playwright";
import { DataTable } from "@cucumber/cucumber";
import {
  addCookieWhenValueIsList,
  COOKIE_NAME, deleteCookieByName,
  deleteCookieByValue,
  FILTER_TYPE,
  findWithRoleAndName,
  findWithRoleAndNameAndContent,
  findWithRoleAndNameAndContentDisable,
  findWithRoleAndNameAndContentEnable,
  getCookie,
  getPageOrElement,
  MockType,
  notFoundWithRoleAndName,
  withinRoleAndName
} from "./core-engine";

import { Given, When, Then } from "@cucumber/cucumber";
import { World } from "../../preprocessor/run/world";
import { ContextObject, RunOptions } from "axe-core";
import path from "path";

Given(`${key.given.viewport.preset}`, async function(this: World, viewportPreset: string) {
  await this.page.setViewportSize(devices[viewportPreset].viewport);
});

Given(
 `${key.given.viewport.withWidthAndHeight}`, async function
 (this: World, width: number, height: number) {
   await this.page.setViewportSize({ width: width, height: height });
 }
);

Given(`${key.when.visit}`, { timeout: 60 * 1000 }, async function(this: World, siteUrl: string) {
  await deleteCookieByName(this, COOKIE_NAME.SELECTED_ELEMENT);
  await this.page.goto(`${siteUrl}`);
});

When(`${key.when.click.withContext}`, async function(this: World) {
  await getPageOrElement(this).then((element: Locator) => element.click({ timeout: DEFAULT_TIMEOUT }));
});


When(`${key.when.click.button}`, async function(this: World, name: string) {
  await click(this, "button", name);
});

When(`${key.when.click.withRole}`, async function(this: World, role: string, name: string) {
  await click(this, role, name);
});

// TODO : permet de gérer les label accessibles donc pas que les aria : https://playwright.dev/docs/api/class-locator#locator-get-by-label
When(`${key.when.withinElement.ariaLabel}`, async function(this: World, expectedAriaLabel: string) {
  const sanitizedExpectedAriaLabel = encodeURIComponent(expectedAriaLabel).replaceAll("%20", " ");
  await getPageOrElement(this).then((element) => expect(element.getByLabel(sanitizedExpectedAriaLabel, { exact: true })).toHaveCount(1));
  await addCookieWhenValueIsList(this, COOKIE_NAME.SELECTED_ELEMENT, { name: FILTER_TYPE.ARIA_LABEL, value: sanitizedExpectedAriaLabel });
});
When(`${key.when.resetContext}`, async function(this: World) {
  await this.context.clearCookies();
});

When(`${key.when.withinElement.selector}`, async function(this: World, selector: string) {
  await getPageOrElement(this).then((element) => expect(element.locator(selector)).toHaveCount(1));
  await addCookieWhenValueIsList(this, COOKIE_NAME.SELECTED_ELEMENT, { name: FILTER_TYPE.SELECTOR, value: selector });
});

When(`${key.when.type}`, async function(this: World, textToType: string) {
  await getPageOrElement(this).then(async (element: Locator) => {
    await element.focus({ timeout: 10000 });
    await element.type(textToType);
    // console.debug(await showAttributesInLocator(element));
  });
});


When(`${key.when.keyboard.multiplePress}`, async function(this: World, nbTimes: number, key: string) {
  for (let i = 1; i <= nbTimes; i++) {
    await getPageOrElement(this).then(async (element: Locator) => {
      await element.focus({ timeout: 10000 });
      await pressKey(this, element, key);
    });
  }
});

When(`${key.when.keyboard.press}`, async function(this: World, key: string) {
  await getPageOrElement(this).then(async (element: Locator) => {
    await element.focus({ timeout: 10000 });
    await pressKey(this, element, key);
  });
});
When(`${key.when.timeout}`, async function(this: World, newTimeout: number) {
  await this.testInfo.setTimeout(newTimeout);
});


When(`${key.when.withinElement.roleAndName}`, async function(this: World, role: string, name: string) {
  await withinRoleAndName(this, role, name);
});

When(`${key.when.withinElement.testId}`, async function(this: World, testId: string) {
  testId = encodeURIComponent(testId);
  await getPageOrElement(this).then(async (element) => await expect(element.getByTestId(testId)).toHaveCount(1));
  await addCookieWhenValueIsList(this, COOKIE_NAME.SELECTED_ELEMENT, { name: FILTER_TYPE.TEST_ID, value: testId });
});


When(
 `${key.when.mock.withBody}`,
 async function(this: World, verb: string, url: string, name: string, body: any) {
   await addCookieWhenValueIsList(this, COOKIE_NAME.MOCK_URL, { name: name, url: url });
   await this.page.route(url, async route => {
     const json = body;
     await route.fulfill({ json });
   });
 }
);

When(
 `${key.when.mock.withStatusCode}`,
 async function(this: World, verb: string, url: string, name: string, statusCode: number) {
   await addCookieWhenValueIsList(this, COOKIE_NAME.MOCK_URL, { name: name, url: url });
   await this.page.route(url, async route => {
     await route.fulfill({ status: statusCode });
   });
 }
);

When(
 `${key.when.mock.withFixture}`,
 async function(this: World, verb: string, url: string, name: string, fixture: any) {
   await addCookieWhenValueIsList(this, COOKIE_NAME.MOCK_URL, { name: name, url: url });
   const data = await fs.readFileSync(path.join(getConfigDir(), `playwright/fixtures/${fixture}`));
   await this.page.route(url, async route => {
     await route.fulfill({ body: data });
   });
 }
);

Then(`${key.then.element.withSelector}`, async function(this: World, selector: string) {
  await getPageOrElement(this).then((element) => expect(element.locator(selector)).toHaveCount(1));
});

When(
 `${key.when.headers.forUriAndMethod}`,
 async function(this: World, url: string, method: string, headersToSet: DataTable) {
   await this.page.route(url, async route => {
     const headers = route.request().headers();
     await route.continue({ headers: { ...headers, ...headersToSet.rowsHash() } });
   });
 }
);

When(
 `${key.when.headers.forUri}`,
 async function(this: World, url: string, headersToSet: DataTable) {
   await this.page.route(url, async route => {
     const headers = route.request().headers();
     await route.continue({ headers: { ...headers, ...headersToSet.rowsHash() } });
   });
 }
);

Then(`${key.then.element.withRoleAndName}`, async function(this: World, role: string, name: string) {
  await findWithRoleAndName(this, role, name);
});

Then(`${key.then.element.withContent}`, async function(this: World, textContent: string) {
  // TODO partie pris de faire en exactitude. A voir si on doit faire 2 phrases https://playwright.dev/docs/api/class-locator#locator-get-by-text
  await getPageOrElement(this).then((element) => expect(element.getByText(textContent, { exact: true })).toHaveCount(1));
});

Then(`${key.then.element.not.withContent}`, async function(this: World, textContent: string) {
  await getPageOrElement(this).then((element) => expect(element.getByText(textContent, { exact: true })).toHaveCount(0));
});

Then(`${key.then.element.withTestId}`, async function(this: World, testId: string) {
  testId = encodeURIComponent(testId);
  await getPageOrElement(this).then((element) => expect(element.getByTestId(testId, { exact: true })).toHaveCount(1));
});

Then(`${key.then.element.not.withTestId}`, async function(this: World, testId: string) {
  testId = encodeURIComponent(testId);
  await getPageOrElement(this).then((element) => expect(element.getByTestId(testId, { exact: true })).toHaveCount(0));
});

Then(
 `${key.then.a11y.axecore.default}`,
 async function(this: World) {
   await injectAxe(this.page as Page);
   await checkA11y(this.page as Page);
 });

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

Then(
 `${key.then.a11y.axecore.onlyCritical}`,
 async function(this: World) {
   await injectAxe(this.page as Page);
   await checkA11y(this.page as Page, undefined, {
     includedImpacts: ["critical"]
   });
 });

Then(
 `${key.then.a11y.axecore.withImpacts}`,
 async function(this: World, impacts: any) {
   await injectAxe(this.page as Page);
   await checkA11y(this.page as Page, undefined, {
     includedImpacts: [impacts]
   });
 });
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

Then(
 `${key.then.element.not.withRoleAndName}`,
 async function(this: World, role: string, name: string) {
   await notFoundWithRoleAndName(this, role, name);
 }
);
Then(
 `${key.then.element.withRoleAndNameAndContent}`,
 async function(this: World, expectedRole: string, name: string, expectedTextContent: string) {
   await findWithRoleAndNameAndContent(this, expectedRole, name, expectedTextContent);
 }
);

Then(
 `${key.then.element.withRoleAndNameAndContentDisabled}`,
 async function(this: World, expectedRole: string, name: string, expectedTextContent: string) {
   await findWithRoleAndNameAndContentDisable(this, expectedRole, name, expectedTextContent);
 }
);

Then(
 `${key.then.element.withRoleAndNameAndContentEnabled}`,
 async function(this: World, expectedRole: string, name: string, expectedTextContent: string) {
   await findWithRoleAndNameAndContentEnable(this, expectedRole, name, expectedTextContent);
 }
);

Then(`${key.then.element.withAriaLabel}`, async function(this: World, expectedAriaLabel: string) {
  expectedAriaLabel = encodeURIComponent(expectedAriaLabel);
  await getPageOrElement(this).then((element) => expect(element.getByLabel(expectedAriaLabel, { exact: true })).toHaveCount(1));
});

Then(`${key.then.element.not.withAriaLabel}`, async function(this: World, expectedAriaLabel: string) {
  expectedAriaLabel = encodeURIComponent(expectedAriaLabel);
  await getPageOrElement(this).then((element) => expect(element.getByLabel(expectedAriaLabel, { exact: true })).toHaveCount(0));
});

Then(`${key.then.element.withAriaLabelAndContent}`, async function(this: World, expectedAriaLabel: string, expectedTextContent: string) {
  expectedAriaLabel = encodeURIComponent(expectedAriaLabel);
  await getPageOrElement(this).then(async (element) => {
    const byLabel = element.getByLabel(expectedAriaLabel, { exact: true });
    await expect(byLabel).toHaveCount(1);
    await expect(byLabel.filter({ hasText: expectedTextContent })).toHaveCount(1);
  });
});

Then(`${key.then.wait.mock}`, async function(this: World, name: string) {
  const cookie = await getCookie(this, COOKIE_NAME.MOCK_URL);
  const mockUrls: MockType[] = JSON.parse(cookie.value);
  const mockUrl: MockType | undefined = mockUrls.find(mock => mock.name === name);
  await expect(mockUrl).not.toBeUndefined();
  const requestPromise = await this.page.waitForResponse(mockUrl?.url);
  const request = await requestPromise;
  await deleteCookieByValue(this, COOKIE_NAME.MOCK_URL, mockUrl);
  // console.debug("request: ", request);
});
//
Then(`${key.then.wait.milliSeconds}`, async function(this: World, ms: number) {
  await this.page.waitForTimeout(ms);
});

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

async function pressKey(world: World, element: Locator, key: string) {
  switch (key) {
    case KEY_PRESS.TAB:
      await element.press("Tab");
      break;
    case KEY_PRESS.REVERSE_TAB:
      await element.press("ShiftLeft+Tab");
      break;
    case KEY_PRESS.UP:
      await element.press("ArrowUp");
      break;
    case KEY_PRESS.DOWN:
      await element.press("ArrowDown");
      break;
    case KEY_PRESS.LEFT:
      await element.press("ArrowLeft");
      break;
    case KEY_PRESS.RIGHT:
      await element.press("ArrowRight");
      break;
    default:
      console.error("the command" + key + " is unrecognized.");
      break;
  }
  await deleteCookieByName(world, COOKIE_NAME.SELECTED_ELEMENT);
  await addCookieWhenValueIsList(world, COOKIE_NAME.SELECTED_ELEMENT, { name: FILTER_TYPE.SELECTOR_PARENT, value: "*:focus" });
}

async function click(world: World, role: any, name: string) {
  await getPageOrElement(world).then(async (element) => {
      const byRole = element.getByRole(role, { name: name, includeHidden: true, exact: true });
      await expect(byRole).toHaveCount(1);
      await byRole.click({ timeout: DEFAULT_TIMEOUT });
      await world.context.clearCookies();
  });
}


