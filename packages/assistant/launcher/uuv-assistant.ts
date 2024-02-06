/**
* Software Name : UUV
*
* SPDX-FileCopyrightText: Copyright (c) 2022-2024 Orange
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

import { chromium } from "playwright-chromium";
import conf from "./conf.json";
import chalk from "chalk";
import minimist from "minimist";

export class UuvAssistant {

    public async start(translatorFn?: (el: HTMLElement) => string) {
        const argv = minimist(process.argv.slice(2));
        const browser = await chromium.launch({ headless: false });
        const browserContext = await browser.newContext({ viewport: null });
        const page = await browserContext.newPage();

        if (!argv["targetUrl"]) {
            console.error(chalk.redBright("Parameter --targetUrl is required"));
            process.exit(-1);
        }

        const translatorDeclaration = translatorFn ?
            `var translator = ${translatorFn.toString()}; console.log('translator'); console.log(translator);` :
            "var translator = null;";

        await browserContext.addInitScript({
            content: `${translatorDeclaration}`
        });
        await browserContext.addInitScript({
            path: `${__dirname}${conf.unifiedFile}`
        });
        await page.goto(argv["targetUrl"]);
    }
}
