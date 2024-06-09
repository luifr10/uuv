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

import { executePreprocessor } from "./runner-playwright";

import chokidar from "chokidar";
import chalk from "chalk";

const tempDir = process.argv[2];
const projectDir = process.argv[3];
const tags = process.argv[4];

if (!tempDir || !projectDir) {
  console.log(chalk.redBright("An error occurred during test files watching"));
  process.exit(-1);
}

chokidar.watch(`${projectDir}/e2e/**/*.feature`, {
  ignoreInitial: true
})
 .on("change", () => {
   console.log(chalk.yellowBright("\nRefreshing test files..."));
   executePreprocessor();
   console.log(chalk.yellowBright("Test files refreshed\n"));
 })
 .on("add", path => {
   console.log(chalk.yellowBright(`\nFile ${path} has been added`));
   executePreprocessor();
   console.log(chalk.yellowBright("Test files refreshed\n"));
 })
 .on("unlink", path => {
   console.log(chalk.yellowBright(`\nFile ${path} has been removed`));
   executePreprocessor();
   console.log(chalk.yellowBright("Test files refreshed\n"));
 });

