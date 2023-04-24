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

import { Context } from "./_context";

beforeEach(function () {
    cy.wrap(new Context()).as("context");
});

export function assertTextContent<Subject>(
    response: Subject,
    expectedTextContent: string
) {
    try {
        assert.equal(response[0].textContent, expectedTextContent);
    } catch (e) {
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        assert.equal((response[0] as any).value, expectedTextContent);
    }
}

export function findWithRoleAndName(role: string, name: string) {
    cy.uuvFindByRole(role, { name })
        .uuvFoundedElement()
        .should("exist");
}

export function withinRoleAndName(role: string, name: string) {
    const foundedElement = cy.uuvFindByRole(role, { name, hidden: true })
        .uuvFoundedElement()
        .should("exist");

    return cy.uuvPatchContext({
        focusedElement: foundedElement
    });
}

export function notFoundWithRoleAndName(role: string, name: string) {
    cy.uuvFindByRole(role, { name })
        .should("not.exist");
}

export function findWithRoleAndNameAndContent(expectedRole: string, name: string, expectedTextContent: string) {
    cy.uuvFindByRole(expectedRole, { name })
        .uuvFoundedElement()
        .should("exist")
        .then((response) => {
            assert.equal(response.length, 1);
            assertTextContent(response, expectedTextContent);
        });
}

export function findWithRoleAndNameAndContentDisable(expectedRole: string, name: string, expectedTextContent: string) {
    cy.uuvFindByRole(expectedRole, { name })
        .uuvFoundedElement()
        .should("exist")
        .then((response) => {
            assert.equal(response.length, 1);
            assertTextContent(response, expectedTextContent);
        })
        .invoke("attr", "disabled")
        .should("eq", "disabled");
}

export function findWithRoleAndNameAndContentEnable(expectedRole: string, name: string, expectedTextContent: string) {
    cy.uuvFindByRole(expectedRole, { name })
        .uuvFoundedElement()
        .should("exist")
        .then((response) => {
            assert.equal(response.length, 1);
            assertTextContent(response, expectedTextContent);
        })
        .invoke("attr", "disabled")
        .should("eq", undefined);
}
