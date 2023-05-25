#!/usr/bin/env node

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

import { UuvAssistant } from "./index";
import chalk from "chalk";
import figlet from "figlet";
import fs from "fs";

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
    const pJsonStr = fs.readFileSync(`${__dirname}/../package.json`, {
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
