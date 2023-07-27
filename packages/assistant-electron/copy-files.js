/**
* Software Name : UUV
* SPDX-FileCopyrightText: Copyright (c) 2022-2023 Orange
* SPDX-License-Identifier: MIT
*
* This software is distributed under the MIT License,
* the text of which is available at https://spdx.org/licenses/MIT.html
* or see the "LICENSE" file for more details.
*
* Authors: NJAKO MOLOM Louis Fredice & SERVICAL Stanley
* Software description: Make test writing fast, understandable by any human understanding English or French.
 */
const fs = require("fs");

function copyFiles() {
  console.log("Copying files");
  fs.copyFileSync("index.html", "../docs/static/assistant/index.html");
  fs.copyFileSync("style.css", "../docs/static/assistant/style.css");
  console.log("Files copied");
}

copyFiles();
