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
    await run(mode === "open" ? "open" : "e2e", "tests/.features-gen", ".", argv.generateHtmlReport);
}

testUUV();
