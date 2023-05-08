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

import chalk from "chalk";
import figlet from "figlet";
import minimist from "minimist";
import { run } from "./runner-playwright";
import fs from "fs";

export async function main() {
  const PROJECT_DIR = "uuv";
  const FEATURE_GEN_DIR = `${PROJECT_DIR}/.uuv-features-gen`;
  printBanner(getCurrentVersion);

  const argv = minimist(process.argv.slice(2));
  const command = findTargetCommand(argv);
  console.info(chalk.blueBright(`Executing UUV command ${command}...`));
  switch (command) {
    case "open":
      await openPlaywright(argv);
      break;
    case "e2e":
      await runE2ETests(argv);
      break;
    default:
      console.error(chalk.red("Unknown command"));
      process.exit(1);
  }
  console.info(`UUV command ${command} executed`);

  function extractArgs(argv: any) {
    const browser = argv.browser ? argv.browser : "chrome";
    const env = argv.env ? JSON.parse(argv.env.replace(/'/g, "\"")) : {};

    console.debug("Variables: ");
    console.debug(`  -> browser: ${browser}`);
    console.debug(`  -> env: ${JSON.stringify(env)}`);
    return { browser, env };
  }

  function openPlaywright(argv: any): Promise<any> {
    // TODO Implementer les paramètres env en json
    //const { env } = extractArgs(argv);
    return run( "open", FEATURE_GEN_DIR, PROJECT_DIR);
  }

  function runE2ETests(argv: any): Promise<any> {
    const { browser, env } = extractArgs(argv);

    // TODO Manage HTML Report
    // Creating needed dirs
    // if (!fs.existsSync(JSON_REPORT_DIR)) {
    //   fs.mkdirSync(JSON_REPORT_DIR, { recursive: true });
    // }

    // Running Tests
    return run( "e2e", FEATURE_GEN_DIR, PROJECT_DIR, argv.generateHtmlReport)
        .then(async (result) => {
          console.log(`Status ${chalk.green("success")}`);
      })
      .catch((err: any) => {
        console.error(chalk.red(err));
        process.exit(-1);
      });
  }

  function findTargetCommand(argv: any) {
    if (argv._.length < 1) {
      console.error(chalk.red("No command specified"));
      process.exit(1);
    }
    const command = argv._[0];
    return command;
  }

  function printBanner(getCurrentVersion: () => string) {
    console.log(
        chalk.blueBright(
            figlet.textSync("UUV", {
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
    const pJsonStr = fs.readFileSync(`${__dirname}/../../package.json`, {
      encoding: "utf8", flag: "r"
    });
    return JSON.parse(pJsonStr).version;
  }
}
