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
