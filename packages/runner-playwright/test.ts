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

import { run } from "./src/lib/runner-playwright";
import chalk from "chalk";
import figlet from "figlet";
import minimist from "minimist";

let mode = "run";
const argv = minimist(process.argv.slice(2));

if (argv._.length !== 1) {
    console.error(chalk.red("Expected at least one argument! (run or open)"));
    process.exit(1);
} else {
    if (argv._[0] && (argv._[0] === "run" || argv._[0] === "open")) {
        mode = argv._[0];
    }
}

async function testUUV() {
    console.log(
        chalk.blue(
            figlet.textSync("UUV", {
                font: "Big",
                horizontalLayout: "default",
                verticalLayout: "default",
                width: 80,
                whitespaceBreak: true
            })
        )
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await run(mode === "open" ? "open" : "e2e", "tests/.features-gen", ".", argv);
}

testUUV();
