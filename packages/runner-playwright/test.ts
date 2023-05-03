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

let mode = "run";

if (process.argv.length === 2) {
    console.error(chalk.red("Expected at least one argument! (--run or --open)"));
    process.exit(1);
} else {
    if (process.argv[2] && (process.argv[2] === "--run" || process.argv[2] === "--open")) {
        mode = process.argv[2];
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

    await run(mode === "--open" ? "open" : "e2e", "tests/.features-gen", ".");
}

testUUV();
