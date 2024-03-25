/**
 * Software Name : UUV
 *
 * SPDX-FileCopyrightText: Copyright (c) Orange SA
 * SPDX-License-Identifier: MIT
 *
 * This software is distributed under the MIT License,
 * see the "LICENSE" file for more details
 *
 * Authors: NJAKO MOLOM Louis Fredice & SERVICAL Stanley
 * Software description: Make test writing fast, understandable by any human
 * understanding English or French.
 */

import { When } from "@cucumber/cucumber";
import { World } from "../../../preprocessor/run/world";

When("je suis une phrase custom qui vérifie l'existence d'un noeud par le sélecteur {string}", async function (this: World, selector: string) {
    await this.page.locator(selector);
});

