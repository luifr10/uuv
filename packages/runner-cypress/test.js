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

const cypress = require("cypress");
const chalk = require("chalk");

let mode = "--run";
let command;
const UUV_A11Y_REPORT_PATH = "./reports/a11y-report.json";

command = () => {
    return cypress
        .run({
            project: ".",
            browser: "chrome",
            env: {
                uuvA11yReportFilePath: UUV_A11Y_REPORT_PATH,
                generateA11yReport: true
            },
            reporter: "junit",
            reporterOptions: {
                mochaFile: "./reports/e2e/junit-report-[hash].xml"
            }
        });
};

if (process.argv.length === 2) {
    console.error(chalk.red("Expected at least one argument! (--run or --open)"));
    process.exit(1);
} else {
    if (process.argv[2] && (process.argv[2] === "--run" || process.argv[2] === "--open")) {
        mode = process.argv[2];
    }
}

testUUV();

async function testUUV() {
    const Os = require("os");
    const isAdmin = require("is-admin");
    const chalk = require("chalk");
    const figlet = require("figlet");

    figlet.text("UUV", {
        font: "Big",
        horizontalLayout: "default",
        verticalLayout: "default",
        width: 80,
        whitespaceBreak: true
    }, function (err, data) {
        if (err) {
            console.error(chalk.red("Something went wrong..."));
            console.dir(err);
            process.exit(-1);
        }
        console.log(chalk.blue(data));
    });

    if (Os.platform() === "win32" && await isAdmin()) {
        console.error(chalk.red("Please re-run this command without administrator privileges"));
        process.exit(-1);
    }

    if (mode === "--open") {
        command = () => {
            return cypress
                .open({
                    project: ".",
                    browser: "chrome",
                    env: {
                        uuvA11yReportFilePath: UUV_A11Y_REPORT_PATH,
                        generateA11yReport: false
                    }
                });
        };
    }

    command()
        .then(async (result) => {
            if (result) {
                console.log(`Tests suite have been executed in ${chalk.blue(result.totalDuration)} ms`);
                console.log(`Status ${result.totalFailed ? chalk.red("failed") : chalk.green("success")}`);
                process.exit(result.totalFailed);
            } else {
                console.error(chalk.red("An error occured"));
                process.exit(-1);
            }
        })
        .catch((err) => {
            console.error(chalk.red(err));
            process.exit(-1);
        });
}
