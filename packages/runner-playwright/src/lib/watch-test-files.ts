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

"use strict";

import { executePreprocessor } from "./runner-playwright";

import chokidar from "chokidar";
import chalk from "chalk";

const tempDir = process.argv[2];
const configDir = process.argv[3];

if (!tempDir || !configDir) {
  console.log(chalk.redBright("An error occurred during test files watching"));
  process.exit(-1);
}

chokidar.watch(`${configDir}/e2e/**/*.feature`, {
  ignoreInitial: true
})
 .on("change", async (event, path) => {
   console.log(chalk.yellowBright("\nRefreshing test files..."));
   await executePreprocessor(tempDir, configDir);
   console.log(chalk.yellowBright("Test files refreshed\n"));
 })
 .on("add", async path => {
   console.log(chalk.yellowBright(`\nFile ${path} has been added`));
   await executePreprocessor(tempDir, configDir);
   console.log(chalk.yellowBright("Test files refreshed\n"));
 })
 .on("unlink", async path => {
   console.log(chalk.yellowBright(`\nFile ${path} has been removed`));
   await executePreprocessor(tempDir, configDir);
   console.log(chalk.yellowBright("Test files refreshed\n"));
 });

