import { chromium } from "playwright-chromium";

let translator: any;
export class UuvAssistant {

    private initReactDomRootElementFn() {
        return () => {
            document.addEventListener("DOMContentLoaded", () => {
                const rootElement = document.createElement("div");
                const event = translator !== undefined ? new CustomEvent("UUVAssistantReadyToLoad", {
                  detail: {
                    translator: translator
                  }
                }) : new Event("UUVAssistantReadyToLoad");
                rootElement.id = "uvv-assistant-root";
                document.body.appendChild(rootElement);
                document.dispatchEvent(event);
            });
        };
    }

    public async start(translatorFn?: (el: HTMLElement) => string) {
        const { chromium } = require("playwright-chromium");
        const argv = require("minimist")(process.argv.slice(2));
        const conf = require("./conf.json");

        const browser = await chromium.launch({ headless: false });
        const browserContext = await browser.newContext();
        const page = await browserContext.newPage();

        const translatorDeclaration = translatorFn ?
            `var translator = ${translatorFn.toString()}; console.log('translator'); console.log(translator);` :
            "var translator = null;";

        await browserContext.addInitScript({
            content: translatorDeclaration
        });
        await browserContext.addInitScript(this.initReactDomRootElementFn());
        await browserContext.addInitScript({
            path: `${__dirname}${conf.reactScript}`
        });

        await page.goto(argv.targetUrl);

        await page.addStyleTag({
            path: `${__dirname}${conf.cssFile}`
        });
    }
}
