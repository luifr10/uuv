import { chromium } from "playwright-chromium";
import fs from "fs";

let translator: any;
let uuvCssContent: any;
export class UuvAssistant {

    private initReactDomRootElementFn() {
        return () => {
            window.onload = function() {
                if (window.location === window.parent.location) {
                    console.log("DOMContentLoaded");
                    const rootElement = document.createElement("div");
                    const event = translator !== undefined ? new CustomEvent("UUVAssistantReadyToLoad", {
                        detail: {
                            translator: translator
                        }
                    }) : new Event("UUVAssistantReadyToLoad");
                    rootElement.id = "uvv-assistant-root";
                    document.body.appendChild(rootElement);
                    document.dispatchEvent(event);

                    const style = document.createElement("style");
                    style.type = "text/css";
                    style.innerHTML = uuvCssContent;
                    document.getElementsByTagName("head")[0].appendChild(style);
                }
            };
        };
    }

    public async start(translatorFn?: (el: HTMLElement) => string) {
        const { chromium } = require("playwright-chromium");
        const argv = require("minimist")(process.argv.slice(2));
        const conf = require("./conf.json");

        const browser = await chromium.launch({ headless: false });
        const browserContext = await browser.newContext({ viewport: null });
        const page = await browserContext.newPage();

        const translatorDeclaration = translatorFn ?
            `var translator = ${translatorFn.toString()}; console.log('translator'); console.log(translator);` :
            "var translator = null;";

        const cssContentDeclaration = `\n var uuvCssContent = "${fs.readFileSync(__dirname + conf.cssFile).toString()}"`;

        await browserContext.addInitScript({
            content: `${translatorDeclaration}${cssContentDeclaration}`
        });
        await browserContext.addInitScript(this.initReactDomRootElementFn());
        await browserContext.addInitScript({
            path: `${__dirname}${conf.reactScript}`
        });

        await page.goto(argv.targetUrl);
    }
}
