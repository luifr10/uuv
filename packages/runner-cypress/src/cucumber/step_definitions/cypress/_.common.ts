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

import { ByRoleOptions } from "@testing-library/cypress";
import { Context } from "./_context";
import Chainable = Cypress.Chainable;

export const uuvGetContext = (): Chainable<Context> => {
  return cy.get<Context>("@context");
};

export function uuvCheckContextFocusedElement(): Cypress.Chainable<Context> {
  return cy.get<Context>("@context")
        .then(context => {
          // console.log("focusedElement: ", context);
          if (!context.focusedElement) {
            throw new Error("No element currently selected");
          }
          return context;
        });
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
export function uuvPatchContext(partOfContext: any): Cypress.Chainable<Context> {
  return cy.get<Context>("@context").then(context => {
    cy.wrap({
      ...context,
      ...partOfContext
    }).as("context");
  });
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
function addContextOptions(context: Context, roleOptions: any): any {
  const retour = {
    timeout: context.timeout
  };

  return Object.assign(roleOptions, retour);
}

/* eslint-disable  @typescript-eslint/ban-types */
function abstractFindBy(callBackFunction: Function, inputToSearch: any, inputOptions: any) : Cypress.Chainable<JQuery<HTMLElement>> {
  return cy.uuvGetContext().then(context => {
    // console.log("context", context);
    const parentElement = context.focusedElement;
    const options = addContextOptions(context, inputOptions);

    if (parentElement) {
     // console.log("parentElement: ", parentElement);
      return parentElement.should("exist").within(() => {
        callBackFunction(inputToSearch, options).as("foundedChildElement");
      });
    }

    cy.wrap(null).as("foundedChildElement");
    return callBackFunction(inputToSearch, options);
  });
}

export function uuvFindAllByRole(role: string, roleOptions: ByRoleOptions) : Cypress.Chainable<JQuery<HTMLElement>> {
  return abstractFindBy(
    cy.findAllByRole,
    role,
    roleOptions
  );
}

export function uuvFindByRole(role: string, roleOptions: ByRoleOptions) : Cypress.Chainable<JQuery<HTMLElement>> {
  return abstractFindBy(
    cy.findByRole,
    role,
    roleOptions
  );
}

export function uuvFindByLabelText(labelTextToSearch: string, roleOptions: ByRoleOptions) : Cypress.Chainable<JQuery<HTMLElement>> {
  return abstractFindBy(
    cy.findByLabelText,
    labelTextToSearch,
    roleOptions
  );
}

export function uuvFindByText(textToSearch: string, roleOptions: ByRoleOptions) : Cypress.Chainable<JQuery<HTMLElement>> {
  return abstractFindBy(
    cy.findByText,
    (content: any, element: any) => {
      const hasText = (elem: any) => elem.textContent === textToSearch;
      const elementHasText = hasText(element);
      const childrenDontHaveText = Array.from(element?.children || []).every(child => !hasText(child));
      return elementHasText && childrenDontHaveText;
    },
    roleOptions
  );
}

export function uuvFindByTestId(testId: string) : Cypress.Chainable<JQuery<HTMLElement>> {
  return abstractFindBy(
      cy.findByTestId,
      testId,
      {}
  );
}

export function uuvFoundedElement(subject) : Cypress.Chainable<JQuery<HTMLElement>> {
  return cy.get("@foundedChildElement")
      .then((response: any) => {
        return response !== "empty" && response !== null ? response.foundedChildElement : subject;
      });
}

