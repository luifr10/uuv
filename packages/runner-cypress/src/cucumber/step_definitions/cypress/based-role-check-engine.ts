/**
 * Copyright UUV.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
import { key } from "@uuv/runner-commons";

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
