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

import { BaseStepDefinition } from "./generate-base-step-definitions";
import { BasedRoleStepDefinition } from "./generate-based-role-step-definitions";
import { STEP_DEFINITION_FILE_NAME, TEST_RUNNER_ENUM } from "./common";


export function generateStepDefinitionForRunner(baseDir: string, runner: TEST_RUNNER_ENUM) {
 const cypressBaseStepDefinition: BaseStepDefinition = new BaseStepDefinition(baseDir, runner, STEP_DEFINITION_FILE_NAME.BASE);
 cypressBaseStepDefinition.runGenerate();
 const cypressBasedRoleStepDefinition: BasedRoleStepDefinition = new BasedRoleStepDefinition(baseDir, runner, STEP_DEFINITION_FILE_NAME.BY_ROLE);
 cypressBasedRoleStepDefinition.runGenerate();
}
