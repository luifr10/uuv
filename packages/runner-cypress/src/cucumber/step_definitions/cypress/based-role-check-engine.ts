/**
* Software Name : UUV
*
* SPDX-FileCopyrightText: Copyright (c) 2022-2023 Orange
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

import { Then, When, } from "@badeball/cypress-cucumber-preprocessor";
import "../../cypress/commands";
import {
    findWithRoleAndName,
    findWithRoleAndNameAndContent,
    findWithRoleAndNameAndContentDisable,
    findWithRoleAndNameAndContentEnable,
    notFoundWithRoleAndName,
    withinRoleAndName
} from "./core-engine";
import { key } from "@uuv/runner-commons/wording/web";

When(`${key.when.withinElement.roleAndName}`, function(name: string) {
    return withinRoleAndName("$roleId", name);
});

Then(`${key.then.element.withRoleAndName}`, async function(name: string) {
    findWithRoleAndName("$roleId", name);
});

Then(
    `${key.then.element.not.withRoleAndName}`,
    async function(name: string) {
        notFoundWithRoleAndName("$roleId", name);
    }
);

When(`${key.when.type}`, function(textToType: string, name: string) {
    cy.uuvFindByRole("$roleId", { name: name }).uuvFoundedElement().type(textToType);
});

Then(
    `${key.then.element.withRoleAndNameAndContent}`,
    async function(name: string, expectedTextContent: string) {
        findWithRoleAndNameAndContent("$roleId", name, expectedTextContent);
    }
);

Then(
    `${key.then.element.withRoleAndNameAndContentDisabled}`,
    async function(name: string, expectedTextContent: string) {
        findWithRoleAndNameAndContentDisable("$roleId", name, expectedTextContent);
    }
);

Then(
    `${key.then.element.withRoleAndNameAndContentEnabled}`,
    async function(name: string, expectedTextContent: string) {
        findWithRoleAndNameAndContentEnable("$roleId", name, expectedTextContent);
    }
);
