#!/usr/bin/env node

import { UuvAssistant } from "./index";
import chalk from "chalk";
import figlet from "figlet";
import fs from "fs";

function printBanner(getCurrentVersion: () => string) {
    console.log(
        chalk.blueBright(
            figlet.textSync("UUV - Assistant", {
                font: "Big",
                horizontalLayout: "default",
                verticalLayout: "default",
                width: 80,
                whitespaceBreak: true
            })
        )
    );
    console.info(chalk.blueBright(`Version: ${getCurrentVersion()}\n\n`));
}

function getCurrentVersion(): string {
    const pJsonStr = fs.readFileSync(`${__dirname}/../package.json`, {
        encoding: "utf8", flag: "r"
    });
    return JSON.parse(pJsonStr).version;
}

function main() {
    console.log("UUV Assistant starting...");
    printBanner(getCurrentVersion);
    new UuvAssistant().start().then(() => {
        console.log(chalk.yellow("UUV Assistant started"));
    });
}

main();
