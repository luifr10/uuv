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

"use strict";

async function testUUV() {
    const { register } = require("ts-node");
    const { compilerOptions } = require("./tsconfig.json");
    register({ compilerOptions });

    const uuvCli = require("./src/lib/uuv-cli");
    uuvCli.main(".");
}

testUUV();
