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

function translateFeatures(tempDir: string, configDir: string) {
    const FEATURE_DIR = `${tempDir}/${configDir !== "." ? configDir + "/e2e" : "e2e"}`;
    const filenames = fs.readdirSync(FEATURE_DIR,
        { encoding: "utf8" });
    filenames.forEach(file => {
        const generatedFile = `${FEATURE_DIR}/${file}`;
        let data = fs.readFileSync(
            generatedFile,
            { encoding: "utf8" });
        data = data
            .replaceAll("Soit", "Given")
            .replaceAll("Sachant que", "Given")
            .replaceAll("Sachant qu'", "Given")
            .replaceAll("Sachant", "Given")
            .replaceAll("Etant donné que", "Given")
            .replaceAll("Étant donné que", "Given")
            .replaceAll("Étant donné qu'", "Given")
            .replaceAll("Etant donné qu'", "Given")
            .replaceAll("Etant données", "Given")
            .replaceAll("Étant données", "Given")
            .replaceAll("Etant donnés", "Given")
            .replaceAll("Étant donnés", "Given")
            .replaceAll("Etant donnée", "Given")
            .replaceAll("Étant donnée", "Given")
            .replaceAll("Etant donné", "Given")
            .replaceAll("Étant donné", "Given")
            .replaceAll("Quand", "When")
            .replaceAll("Lorsque", "When")
            .replaceAll("Lorsqu'", "When")
            .replaceAll("Alors", "Then")
            .replaceAll("Donc", "Then")
            .replaceAll("Et que", "And")
            .replaceAll("Et qu'", "And")
            .replaceAll("Et", "And")
            .replaceAll("Mais que", "But")
            .replaceAll("Mais qu'", "But")
            .replaceAll("Mais", "But");
        data = "/*******************************\n" +
            "NE PAS MODIFIER, FICHIER GENERE\n" +
            "*******************************/\n\n" +
            data;
        fs.writeFileSync(generatedFile, data);
        console.log(
            chalk.gray(`[WRITE] ${generatedFile} written successfully`)
        );
    });
}

function runPlaywright(mode: "open" | "e2e", configDir: string, browser = "chromium", generateHtmlReport = false, env?: any, targetTestFile?: string) {
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
        // eslint-disable-next-line max-len
        const command = `npx playwright test --project=${browser} -c ${configFile} ${mode === "open" ? "--ui" : ""}${getTargetTestFileForPlawright(targetTestFile)}`;
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
    translateFeatures(tempDir, configDir);
    console.log("preprocessor executed");
}

export async function run(mode: "open" | "e2e", tempDir = "uuv/.features-gen/e2e", configDir = "uuv", argv: any) {
    const { browser, env, targetTestFile } = extractArgs(argv);
    await executePreprocessor(tempDir, configDir, env);
    if (mode === "open") {
        cp.fork(path.join(__dirname, "watch-test-files"), [tempDir, configDir, env]);
    }
    runPlaywright(mode, configDir, browser, argv.generateHtmlReport, env, targetTestFile);
}

function extractArgs(argv: any) {
    const browser = argv.browser;
    const env = argv.env ? JSON.parse(argv.env.replace(/'/g, "\"")) : {};
    const targetTestFile = argv.targetTestFile ? argv.targetTestFile : null;

    console.debug("Variables: ");
    console.debug(`  -> browser: ${browser}`);
    console.debug(`  -> env: ${JSON.stringify(env)}`);
    if (targetTestFile) {
        console.debug(`  -> targetTestFile: ${targetTestFile}`);
    }
    return { browser, env, targetTestFile };
}
