// / <reference types="cypress" />
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

import "@testing-library/cypress/add-commands";
import "cypress-axe";
import { ByRoleOptions } from "@testing-library/cypress";
import {
  uuvCheckContextFocusedElement,
  uuvFindAllByRole,
  uuvFindByLabelText,
  uuvFindByRole,
  uuvFindByTestId,
  uuvFindByText,
  uuvFoundedElement,
  uuvGetContext,
  uuvPatchContext
} from "../cucumber/step_definitions/cypress/_.common";
import { Context } from "../cucumber/step_definitions/cypress/_context";

declare global {
  namespace Cypress {
    interface Chainable {
      uuvGetContext(): Cypress.Chainable<Context>;
      uuvCheckContextFocusedElement(): Cypress.Chainable<Context>;
      uuvPatchContext(partOfContext: any): Chainable<Context>;
      uuvFindByText(textToSearch: string, roleOptions: ByRoleOptions): Cypress.Chainable<JQuery<HTMLElement>>;
      uuvFindByTestId(testId: string): Cypress.Chainable<JQuery<HTMLElement>>;
      uuvFindByRole(role: string, roleOptions: ByRoleOptions): Cypress.Chainable<JQuery<HTMLElement>>;
      uuvFindByLabelText(labelTextToSearch: string, roleOptions: ByRoleOptions): Cypress.Chainable<JQuery<HTMLElement>>;
      uuvFindAllByRole(role: string, roleOptions: ByRoleOptions): Cypress.Chainable<JQuery<HTMLElement>>;
      uuvFoundedElement(): Cypress.Chainable<JQuery<HTMLElement>>;
    }
  }
}

Cypress.Commands.add("uuvGetContext", uuvGetContext);
Cypress.Commands.add("uuvCheckContextFocusedElement", uuvCheckContextFocusedElement);
Cypress.Commands.add("uuvPatchContext", uuvPatchContext);
Cypress.Commands.add("uuvFindByText", uuvFindByText);
Cypress.Commands.add("uuvFindByTestId", uuvFindByTestId);
Cypress.Commands.add("uuvFindByRole", uuvFindByRole);
Cypress.Commands.add("uuvFindByLabelText", uuvFindByLabelText);
Cypress.Commands.add("uuvFindAllByRole", uuvFindAllByRole);
Cypress.Commands.add("uuvFoundedElement", { prevSubject: true }, uuvFoundedElement);
