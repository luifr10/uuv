/**
* Software Name : UUV
*
* SPDX-FileCopyrightText: Copyright (c) 2022-2024 Orange
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

import { When } from "@badeball/cypress-cucumber-preprocessor";

When("je suis une phrase custom qui vérifie l'existence d'un noeud par le sélecteur {string}", function(selector: string) {
    return cy.get(selector).should("exist");
});
