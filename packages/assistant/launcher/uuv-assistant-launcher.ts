#!/usr/bin/env node

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

import { UuvAssistant } from "./index";
import chalk from "chalk";
import figlet from "figlet";
import fs from "fs";
import conf from "./conf.json";

function printBanner(getCurrentVersion: () => string) {
    console.log(
        chalk.blueBright(
            figlet.textSync("UUV - Assistant", {
                font: "Big",
                horizontalLayout: "default",
                verticalLayout: "default",
                width: 80,
                whitespaceBreak: true
            })
        )
    );
    console.info(chalk.blueBright(`Version: ${getCurrentVersion()}\n\n`));
}

function getCurrentVersion(): string {
    const pJsonStr = fs.readFileSync(`${__dirname}${conf.packageJson}`, {
        encoding: "utf8", flag: "r"
    });
    return JSON.parse(pJsonStr).version;
}

function main() {
    console.log("UUV Assistant starting...");
    printBanner(getCurrentVersion);
    new UuvAssistant().start().then(() => {
        console.log(chalk.yellow("UUV Assistant started"));
    });
}

main();
