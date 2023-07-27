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

import { BaseStepDefinition } from "./generate-base-step-definitions";
import { BasedRoleStepDefinition } from "./generate-based-role-step-definitions";
import { STEP_DEFINITION_FILE_NAME, TEST_RUNNER_ENUM } from "./common";


export function generateStepDefinitionForRunner(baseDir: string, runner: TEST_RUNNER_ENUM) {
 const cypressBaseStepDefinition: BaseStepDefinition = new BaseStepDefinition(baseDir, runner, STEP_DEFINITION_FILE_NAME.BASE);
 cypressBaseStepDefinition.runGenerate();
 const cypressBasedRoleStepDefinition: BasedRoleStepDefinition = new BasedRoleStepDefinition(baseDir, runner, STEP_DEFINITION_FILE_NAME.BY_ROLE);
 cypressBasedRoleStepDefinition.runGenerate();
}
