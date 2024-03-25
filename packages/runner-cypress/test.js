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

"use strict";

async function testUUV() {
    const { register } = require("ts-node");
    const { compilerOptions } = require("./tsconfig.json");
    register({ compilerOptions });

    const uuvCli = require("./src/lib/uuv-cli");
    uuvCli.main(".");
}

testUUV();
