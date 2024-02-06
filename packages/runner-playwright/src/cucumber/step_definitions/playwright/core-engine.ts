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

import { World } from "../../preprocessor/run/world";
import { expect, Locator as LocatorTest } from "@playwright/test";
import { Cookie, Locator, Page } from "playwright";

export enum COOKIE_NAME {
    SELECTED_ELEMENT="selectedElement",
    MOCK_URL="mockUrl"
}
export enum COOKIE_VALUE {
    NOT_EXIST="notExist",
}

export enum FILTER_TYPE {
    SELECTOR="bySelector",
    ROLE="byRole",
    TEXT="byText",
    ARIA_LABEL="byAriaLabel",
    TEST_ID="byTestId",
    SELECTOR_PARENT="bySelectorParent"
}

export type MockType = {name; string, url: any}
export type FilterType = {name: FILTER_TYPE, value: any}

export async function getPageOrElement(world: World): Promise<any> {
   let pointer: Locator | Page = world.page as Page;
   await getCookie(world, COOKIE_NAME.SELECTED_ELEMENT).then(async cookie => {
        // console.debug("cookieGetPageOrElement", cookie)
        if (cookie.value !== COOKIE_VALUE.NOT_EXIST.toString()) {
            const filters: FilterType[] = JSON.parse(cookie.value);
            // console.debug("filters",filters);
            for (const filter of filters) {
                switch (filter.name) {
                    case FILTER_TYPE.SELECTOR:
                        pointer = pointer.locator(filter.value);
                        break;
                    case FILTER_TYPE.ARIA_LABEL:
                        pointer = pointer.getByLabel(filter.value, { exact: true });
                        break;
                    case FILTER_TYPE.ROLE:
                        pointer = pointer.getByRole(filter.value, { includeHidden: true, exact: true });
                        break;
                    case FILTER_TYPE.TEST_ID:
                        pointer = pointer.getByTestId(filter.value);
                        break;
                    case FILTER_TYPE.TEXT:
                        pointer = pointer.getByText(filter.value, { exact: true });
                        break;
                    case FILTER_TYPE.SELECTOR_PARENT:
                        pointer = pointer.locator(filter.value);
                        break;
                    default:
                        break;
                }
                // console.debug("locatorGetPageOrElement", pointer, filter)
                await expect(pointer as LocatorTest).toHaveCount(1);
            }
        }
    });
    return pointer;
}
export async function addCookieWhenValueIsList(world: World, cookieName: COOKIE_NAME, value: any) {
     // console.debug("value", value)
    const cookieNameStr = `${cookieName.toString()}_${world.testInfo.testId}`;
    const cookie = await getCookie(world, cookieName);
    if (cookie.value !== COOKIE_VALUE.NOT_EXIST.toString()) {
        // console.debug("cookieValue", cookie.value);
        const cookieValue: any[] = JSON.parse(cookie.value);
        cookieValue.push(value);
        // console.debug("cookieValueJSON", JSON.stringify(cookieValue));
        await world.context.addCookies([{ name: cookieNameStr, value: JSON.stringify(cookieValue), path: "/", domain: ".github.com" }]);
    } else {
        await world.context.addCookies([{ name: cookieNameStr, value: `[${JSON.stringify(value)}]`, path: "/", domain: ".github.com" }]);
    }
}
export async function getCookie(world: World, cookieName: COOKIE_NAME) {
    const cookieNameStr = `${cookieName.toString()}_${world.testInfo.testId}`;
    let cookie = {
        "name": cookieNameStr,
        "value": COOKIE_VALUE.NOT_EXIST.toString(),
        "domain": ".github.com",
        "path": "/",
    } as Cookie;

    const cookies = await world.context.cookies();
    if (cookies) {
        const cookieInContext = await cookies.filter(cookie => cookie.name === cookieNameStr)[0];
        // console.debug("selector", cookieInContext)
        if (cookieInContext) {
            cookie = cookieInContext;
        }
    }
    return cookie;
}

export async function deleteCookieByValue(world: World, cookieName: COOKIE_NAME, node: any) {
    const filteredCookies = (await world.context
        .cookies())
        .map((cookie) => {
            if (cookie.name === `${cookieName.toString()}_${world.testInfo.testId}`) {
                const mocks: [] = JSON.parse(cookie.value);
                mocks.filter(mock => mock[0] !== node[0] && mock[1] !== node[1]);
            }
            return cookie;
        });

    await world.context.clearCookies();
    await world.context.addCookies(filteredCookies);
}
export async function deleteCookieByName(world: World, cookieName: COOKIE_NAME) {
    const filteredCookies = (await world.context
        .cookies())
        .filter((cookie) => cookie.name !== `${cookieName.toString()}_${world.testInfo.testId}`);

    await world.context.clearCookies();
    await world.context.addCookies(filteredCookies);
}

export async function findWithRoleAndName(world: World, role: string, name: string): Promise<any> {
    await findWithRoleAndNameAndContent(world, role, name);
}

export async function withinRoleAndName(world: World, role: string, name: string) {
    await findWithRoleAndNameAndContent(world, role, name);
    await addCookieWhenValueIsList(world, COOKIE_NAME.SELECTED_ELEMENT, { name: FILTER_TYPE.SELECTOR, value: `role=${role}[name="${name}"]` });

}

export async function notFoundWithRoleAndName(world: World, role: string, name: string) {
    role = encodeURIComponent(role);
    await getPageOrElement(world).then(async (element) => await expect(element.getByRole(role, { name: name, includeHidden: true, exact: true })).toHaveCount(0));

}

export async function findWithRoleAndNameAndContent(world: World, expectedRole: string, name: string, expectedTextContent: string | undefined = undefined): Promise<any> {
    expectedRole = encodeURIComponent(expectedRole);
    await getPageOrElement(world).then(async (element) => {
           // console.log("final:",expectedRole,name)
           const byRole = await element.getByRole(expectedRole, { name: name, includeHidden: true, exact: true });
           await expect(byRole).toHaveCount(1);
        if (expectedTextContent !== undefined) {
             await checkTextContentLocator(byRole, expectedTextContent);
        }
    });
}

export async function findWithRoleAndNameAndContentDisable(world: World, expectedRole: string, name: string, expectedTextContent: string) {
    expectedRole = encodeURIComponent(expectedRole);
    await getPageOrElement(world).then(async(element) => {
        const byRole = await element.getByRole(expectedRole, { name: name, includeHidden: true, exact: true });
        await expect(byRole).toHaveCount(1);
        await checkTextContentLocator(byRole, expectedTextContent);
        await expect(byRole).toBeDisabled();
    });
}

export async function findWithRoleAndNameAndContentEnable(world: World, expectedRole: string, name: string, expectedTextContent: string) {
    expectedRole = encodeURIComponent(expectedRole);
    await getPageOrElement(world).then(async (element) => {
        const byRole = element.getByRole(expectedRole, { name: name, includeHidden: true, exact: true });
        await expect(byRole).toHaveCount(1);
        await checkTextContentLocator(byRole, expectedTextContent);
        await expect(byRole).toBeEnabled();
    });
}

export async function showAttributesInLocator(element) {
    const attributes = await element.evaluateHandle((aElement) => {
        const attributeNames = aElement.getAttributeNames();
        const result = {};
        attributeNames.forEach((name) => {
            result[name] = aElement.getAttribute(name);
        });
        return result;
    });

    console.debug("attributes of ", element, await attributes.jsonValue());
}

export async function checkTextContentLocator(locator: Locator, expectedTextContent: string): Promise<void> {
   // await showAttributesInLocator(locator);
    try {
        await expect(locator as LocatorTest).toHaveValue(expectedTextContent);
    } catch (err) {
        console.error("No value found for locator: ", locator);
        try {
            await expect(await locator.getAttribute("value")).toBe(expectedTextContent);
        } catch (err) {
            console.error("No attribute value found for locator: ", locator);
            try {
                if (expectedTextContent === "true") {
                    await expect(locator as LocatorTest).toBeChecked();
                } else {
                    await expect(locator as LocatorTest).not.toBeChecked();
                }
            } catch (err) {
                console.error("Can't verify check for locator: ", locator);
                try {
                    await expect(locator as LocatorTest).toHaveText(expectedTextContent);
                } catch (err) {
                    console.error("No text found for locator: ", locator);
                    throw new Error(`Content '${expectedTextContent}' isn't present in locator '${locator}'`);
                }
            }
        }
    }
}
