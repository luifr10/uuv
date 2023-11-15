import { killPortProcess } from "kill-port-process";
import { Launcher } from "@wdio/cli";
import path from "path";

export async function closeAppiumServer(appiumPort: number) {
    try {
        console.info("Try close appium server");
        await killPortProcess(appiumPort);
        console.info("Appium server closed");
    } catch (e) {
        console.warn("Can not close appium server");
    }
}

export function runE2ETests(baseDir: string, automationName: string) {
    process.env["APPIUM_HOME"] = baseDir;
    const wdioConfFile = path.join(baseDir, `wdio.uuv.appium.${automationName}.conf.js`);

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { port } = require(wdioConfFile);
    console.debug(`Running port: ${port}`);
    const wdioLauncher = new Launcher(wdioConfFile);

    return wdioLauncher.run().then(async (code) => {
        await closeAppiumServer(port);
        process.exit(code);
    }, (error) => {
        console.error("Launcher failed to start the test");
        console.error(error);
        process.exit(1);
    });
}
