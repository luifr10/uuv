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

"use strict";

const cypress = require("cypress");
const chalk = require("chalk");

let mode = "--run";
let command;
command = () => {
    return cypress
        .run({
            project: ".",
            browser: "chrome"
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
    const handler = require("serve-handler");
    const http = require("http");
    const Os = require("os");
    const isAdmin = require("is-admin");
    const chalk = require("chalk");
    const port = 9001;
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
                    browser: "chrome"
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
