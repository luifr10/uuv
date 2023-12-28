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

  function openPlaywright(argv: any): Promise<any> {
    return run( "open", FEATURE_GEN_DIR, PROJECT_DIR, argv);
  }

  function runE2ETests(argv: any): Promise<any> {
    // Running Tests
    return run( "e2e", FEATURE_GEN_DIR, PROJECT_DIR, argv)
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
            figlet.textSync("UUV - Playwright", {
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
