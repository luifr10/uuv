// / <reference types="cypress" />
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
