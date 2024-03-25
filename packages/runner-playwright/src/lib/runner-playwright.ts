/**
 * Software Name : UUV
 *
 * SPDX-FileCopyrightText: Copyright (c) Orange SA
 * SPDX-License-Identifier: MIT
 *
 * This software is distributed under the MIT License,
 * see the "LICENSE" file for more details
 *
 * Authors: NJAKO MOLOM Louis Fredice & SERVICAL Stanley
 * Software description: Make test writing fast, understandable by any human
 * understanding English or French.
 */

"use strict";

import chalk from "chalk";
import { generateTestFiles } from "../cucumber/preprocessor/gen";
import fs from "fs";
import cp, { execSync } from "child_process";
import { GherkinDocument } from "@cucumber/messages/dist/esm/src";
import { GeneratedReportType } from "../reporter/uuv-playwright-reporter-helper";
import path from "path";

export interface UUVPlaywrightCucumberMapItem {
    originalFile: string;
    generatedFile: string;
}

export const UUVPlaywrightCucumberMapFile = ".uuv-playwright-cucumber-map.json";

async function bddGen(tempDir: string, env: any) {
    try {
        const mapOfFile = await generateTestFiles({
            outputDir: tempDir,
            tags: env.TAGS
        });
        const content: UUVPlaywrightCucumberMapItem[] = [];
        mapOfFile.forEach((value: GherkinDocument, key: string) => {
            if (value.uri) {
                content.push({
                    originalFile: value.uri,
                    generatedFile: key
                });
            }
        });
        fs.writeFileSync(`${tempDir}/${UUVPlaywrightCucumberMapFile}`, JSON.stringify(content, null, 4), { encoding: "utf8" });
    } catch (err) {
        console.error(chalk.red("Something went wrong..."));
        console.dir(err);
        process.exit(-1);
    }
}

function runPlaywright(mode: "open" | "e2e", configDir: string, browser = "chromium", generateHtmlReport = false, generateJunitReport = false, env?: any, targetTestFile?: string) {
    const configFile = `${configDir}/playwright.config.ts`;
    const reportType = generateHtmlReport ? GeneratedReportType.HTML : GeneratedReportType.CONSOLE;
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        process.env.REPORT_TYPE = reportType;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        process.env.CONFIG_DIR = configDir;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        process.env.browser = browser;
        if (env) {
            Object.keys(env).forEach(key => process.env[key] = env[key]);
        }
        let reporter = " --reporter=@uuv/playwright/uuv-playwright-reporter";
        if (generateJunitReport) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            process.env.PLAYWRIGHT_JUNIT_OUTPUT_NAME = `${configDir}/reports/e2e/junit-report.xml`;
            reporter = `${reporter},junit`;
        }
        // eslint-disable-next-line max-len
        const command = `npx playwright test --project=${browser} -c ${configFile} ${mode === "open" ? "--ui" : ""}${reporter}${getTargetTestFileForPlawright(targetTestFile)}`;
        console.log(chalk.gray(`Running ${command}`));
        execSync(command, { stdio: "inherit" });
    } catch (err) {
        process.exit(-1);
    }
}

function getTargetTestFileForPlawright(targetTestFile?: string): string {
    if (!targetTestFile) {
        return "";
    }
    return ` ${targetTestFile
        .replaceAll("uuv/e2e/", ".uuv-features-gen/uuv/e2e/")
        .replaceAll(".feature", ".feature.spec.js")}`;
}

export async function executePreprocessor(tempDir: string, configDir: string, env: any) {
    console.log("running preprocessor...");
    await bddGen(tempDir, env);
    console.log("preprocessor executed");
}

export async function run(mode: "open" | "e2e", tempDir = "uuv/.features-gen/e2e", configDir = "uuv", argv: any) {
    const { browser, env, targetTestFile } = extractArgs(argv);
    await executePreprocessor(tempDir, configDir, env);
    if (mode === "open") {
        cp.fork(path.join(__dirname, "watch-test-files"), [tempDir, configDir, env]);
    }
    runPlaywright(mode, configDir, browser, argv.generateHtmlReport, argv.generateJunitReport, env, targetTestFile);
}

function extractArgs(argv: any) {
    const browser = argv.browser;
    const env = argv.env ? JSON.parse(argv.env.replace(/'/g, "\"")) : {};
    const targetTestFile = argv.targetTestFile ? argv.targetTestFile : null;

    console.debug("Variables: ");
    // eslint-disable-next-line dot-notation
    const baseUrl = process.env["UUV_BASE_URL"];
    if (baseUrl) {
        console.debug(`  -> baseUrl: ${baseUrl}`);
    }
    console.debug(`  -> browser: ${browser}`);
    console.debug(`  -> env: ${JSON.stringify(env)}`);
    if (targetTestFile) {
        console.debug(`  -> targetTestFile: ${targetTestFile}`);
    }
    return { browser, env, targetTestFile };
}
