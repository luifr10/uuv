import puppeteer, { Browser, Page } from "puppeteer";
import * as path from "path";

export const injectUvvA11YAndLoadUrl = async (targetUrl = path.join(__dirname, "test-rgaa.html") ) => {
    // Launch the browser and open a new blank page
    const browser: Browser = await puppeteer.launch({
        headless: "new"
    });
    const page: Page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto(`file:${targetUrl}`);
    await page.addScriptTag({ path: "bundle/uuv-a11y.bundle.js" });
    page.on("console", message =>
        console.log(`${message.type().substr(0, 3).toUpperCase()} ${message.text()}`)
    );

    return { browser, page };
};

export const DEFAULT_TEST_TIMEOUT = 10000;
