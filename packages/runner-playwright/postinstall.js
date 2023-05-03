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
        copyFileIfMissing("playwright.config.ts", `${TARGET_CONFIG_DIR}`, `${PROJECT_DIR}/uuv`);
        copyFileIfMissing("cucumber.cjs", `${TARGET_CONFIG_DIR}`, `${PROJECT_DIR}`);
    } else {
        console.log("postinstall - Nothing to copy");
    }
}

main();
