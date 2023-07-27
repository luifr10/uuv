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
import fs from "fs";


function copySentences() {
  console.log("Copying sentences");
  fs.copyFileSync("../runner-commons/src/assets/i18n/en.json", "src/assets/en.json");
  fs.copyFileSync("../runner-commons/src/assets/i18n/en-enriched-wordings.json", "src/assets/en-enriched-wordings.json");
  console.log("Sentences copied");
}

copySentences();
