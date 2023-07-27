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

const fs = require("fs");
const PROJECT_DIR = `${__dirname}/../../../`;
const CLI_DIR = `${__dirname}/dist/lib`;
const TARGET_CONFIG_DIR = `${__dirname}/target-config`;

function copyFile(fileToCopy, originFolder, destFolder) {
    if (fs.existsSync(`${originFolder}/${fileToCopy}`)) {
        if (!fs.existsSync(destFolder)) {
            fs.mkdirSync(destFolder, { recursive: true });
        }
        fs.copyFile(`${originFolder}/${fileToCopy}`, `${destFolder}/${fileToCopy}`, (err) => {
            if (err) {
throw err;
}
            console.log(`File ${destFolder}/${fileToCopy} created`);
        });
    }
}

function copyFileIfMissing(fileToCopy, originFolder, destFolder) {
    if (!fs.existsSync(`${destFolder}/${fileToCopy}`)) {
        copyFile(fileToCopy, originFolder, destFolder);
    }
}

function main () {
    if (fs.existsSync(`${PROJECT_DIR}/package.json`) && !fs.existsSync(`${PROJECT_DIR}/.no-postinstall`)) {
        //copyFile('uuv-cli.js', `${CLI_DIR}`, `${PROJECT_DIR}`);
        copyFileIfMissing("cypress.config.ts", `${TARGET_CONFIG_DIR}`, `${PROJECT_DIR}/uuv`);
        copyFileIfMissing("command.ts", `${TARGET_CONFIG_DIR}`, `${PROJECT_DIR}/uuv/cypress/support`);
        copyFileIfMissing(".cypress-cucumber-preprocessorrc.json", `${TARGET_CONFIG_DIR}`, `${PROJECT_DIR}`);
    } else {
        console.log("postinstall - Nothing to copy");
    }
}

main();
