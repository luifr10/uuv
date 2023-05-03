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

import { key } from "@uuv/runner-commons";
import { Then, When } from "@cucumber/cucumber";
import {
    findWithRoleAndName,
    findWithRoleAndNameAndContent, findWithRoleAndNameAndContentDisable, findWithRoleAndNameAndContentEnable,
    notFoundWithRoleAndName,
    withinRoleAndName
} from "./core-engine";
import { World } from "../../preprocessor/run/world";

When(`${key.when.withinElement.roleAndName}`, async function (this: World, name: string) {
    return await withinRoleAndName(this, "$roleId", name);
});

Then(`${key.then.element.withRoleAndName}`, async function (this: World, name: string)  {
    await findWithRoleAndName(this, "$roleId", name);
});

Then(
    `${key.then.element.not.withRoleAndName}`,
    async function (this: World, name: string)  {
       await notFoundWithRoleAndName(this, "$roleId", name);
    }
);

Then(
    `${key.then.element.withRoleAndNameAndContent}`,
    async function (this: World, name: string, expectedTextContent: string)  {
        await findWithRoleAndNameAndContent(this, "$roleId", name, expectedTextContent);
    }
);

Then(
    `${key.then.element.withRoleAndNameAndContentDisabled}`,
    async function (this: World, name: string, expectedTextContent: string)  {
        await findWithRoleAndNameAndContentDisable(this, "$roleId", name, expectedTextContent);
    }
);

Then(
    `${key.then.element.withRoleAndNameAndContentEnabled}`,
    async function (this: World, name: string, expectedTextContent: string)  {
        await findWithRoleAndNameAndContentEnable(this, "$roleId", name, expectedTextContent);
    }
);
