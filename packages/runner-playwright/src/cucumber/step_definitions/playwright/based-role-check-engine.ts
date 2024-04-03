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

import { key } from "@uuv/runner-commons/wording/web";
import { Then, When } from "@cucumber/cucumber";
import {
    findWithRoleAndName,
    findWithRoleAndNameAndContent,
    findWithRoleAndNameAndContentDisable,
    findWithRoleAndNameAndContentEnable, findWithRoleAndNameFocused,
    getPageOrElement,
    notFoundWithRoleAndName,
    withinRoleAndName
} from "./core-engine";
import { World } from "../../preprocessor/run/world";
import { expect } from "@playwright/test";

// Begin of General Section

/**
 * key.when.withinElement.roleAndName.description
 * */
When(`${key.when.withinElement.roleAndName}`, async function (this: World, name: string) {
    return await withinRoleAndName(this, "$roleId", name);
});

/**
 * key.then.element.withRoleAndName.description
 * */
Then(`${key.then.element.withRoleAndName}`, async function (this: World, name: string)  {
    await findWithRoleAndName(this, "$roleId", name);
});

/**
 * key.then.element.not.withRoleAndName.description
 * */
Then(
    `${key.then.element.not.withRoleAndName}`,
    async function (this: World, name: string)  {
       await notFoundWithRoleAndName(this, "$roleId", name);
    }
);

// End of General Section
// Begin of Type Section

/**
 * key.when.type.description
 * */
When(`${key.when.type}`, async function(this: World, textToType: string, name: string) {
    await getPageOrElement(this).then(async (element) => {
        const byRole = await element.getByRole("$roleId", { name: name, includeHidden: true, exact: true });
        await expect(byRole).toHaveCount(1);
        await byRole.type(textToType);
        await this.context.clearCookies();
    });
});

// End of Type Section
// Begin of Content Section

/**
 * key.then.element.withRoleAndNameAndContent.description
 * */
Then(
    `${key.then.element.withRoleAndNameAndContent}`,
    async function (this: World, name: string, expectedTextContent: string)  {
        await findWithRoleAndNameAndContent(this, "$roleId", name, expectedTextContent);
    }
);

/**
 * key.then.element.withRoleAndNameAndContentDisabled.description
 * */
Then(
    `${key.then.element.withRoleAndNameAndContentDisabled}`,
    async function (this: World, name: string, expectedTextContent: string)  {
        await findWithRoleAndNameAndContentDisable(this, "$roleId", name, expectedTextContent);
    }
);

/**
 * key.then.element.withRoleAndNameAndContentEnabled.description
 * */
Then(
    `${key.then.element.withRoleAndNameAndContentEnabled}`,
    async function (this: World, name: string, expectedTextContent: string)  {
        await findWithRoleAndNameAndContentEnable(this, "$roleId", name, expectedTextContent);
    }
);

// End of Content Section

// Begin of Keyboard Section

/**
 * key.then.element.withRoleAndNameFocused.description
 * */
Then(
    `${key.then.element.withRoleAndNameFocused}`,
    async function (this: World, name: string)  {
        await findWithRoleAndNameFocused(this, "$roleId", name);
    }
);

// End of Keyboard Section
