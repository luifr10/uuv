/**
 * Software Name : UUV
 *
 * SPDX-License-Identifier: MIT
 *
 * This software is distributed under the MIT License,
 * see the "LICENSE" file for more details
 *
 * Authors: NJAKO MOLOM Louis Fredice & SERVICAL Stanley
 * Software description: Make test writing fast, understandable by any human
 * understanding English or French.
 */
const fs = require("fs");

function copyFiles() {
  console.log("Copying files");
  fs.copyFileSync("../assistant-electron/index.html", "./static/assistant/index.html");
  fs.copyFileSync("../assistant-electron/style.css", "./static/assistant/style.css");
  console.log("Files copied");
}

copyFiles();
