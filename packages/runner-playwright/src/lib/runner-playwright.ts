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

import { UUVCliOptions, UUVCliRunner } from "@uuv/runner-commons";
import fs from "fs";
import chalk from "chalk";
import { GeneratedReportType } from "../reporter/uuv-playwright-reporter-helper";
import path from "path";
import cp, { execSync } from "child_process";
import _ from "lodash";

export class UUVCliPlaywrightRunner implements UUVCliRunner {
    name = "Playwright";
    defaultBrowser = "chrome";

    constructor(public projectDir, private tempDir) {}

    getCurrentVersion(): string {
        const pJsonStr = fs.readFileSync(`${__dirname}/../../package.json`, {
            encoding: "utf8", flag: "r"
        });
        return JSON.parse(pJsonStr).version;
    }

    async prepare(options: Partial<UUVCliOptions>) {
        console.log("running preprocessor...");
        this.executeSystemCommand(`npx bddgen -c ${this.projectDir}/playwright.config.ts`);
        console.log("preprocessor executed\n");
        this.setEnvironmentVariables(options);
    }

    private setEnvironmentVariables(options: Partial<UUVCliOptions>) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        process.env.REPORT_TYPE = options.report?.html.enabled ? GeneratedReportType.HTML : GeneratedReportType.CONSOLE;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        process.env.CONFIG_DIR = this.projectDir;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        process.env.browser = options.browser;
        if (options.extraArgs) {
            Object.keys(options.extraArgs).forEach(key => process.env[key] = options.extraArgs[key]);
        }
    }

    executeE2eCommand(options: Partial<UUVCliOptions>) {
        this.runPlaywright(options);
    }

    executeOpenCommand(options: Partial<UUVCliOptions>) {
        cp.fork(path.join(__dirname, "watch-test-files"), [this.tempDir, this.projectDir]);
        this.runPlaywright(options);
    }

    private getTargetTestFileForPlaywright(targetTestFile?: string): string {
        if (!targetTestFile) {
            return "";
        }
        return `${targetTestFile
            .replaceAll("uuv/e2e/", ".uuv-features-gen/")
            .replaceAll(".feature", ".feature.spec.js")}`;
    }

    private runPlaywright(options: Partial<UUVCliOptions>) {
        const configFile = `${this.projectDir}/playwright.config.ts`;
        try {

            let reporter = options.command === "e2e" ? "--reporter=@uuv/playwright/uuv-playwright-reporter" : "";
            if (options.report?.junit.enabled) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                process.env.PLAYWRIGHT_JUNIT_OUTPUT_NAME = options.report?.junit.outputFile;
                reporter = `${reporter},junit`;
            }

            const command = this.buildCommand(options, configFile, reporter);

            this.executeSystemCommand(command);
        } catch (err) {
            process.exit(2);
        }
    }

    private buildCommand(options: Partial<UUVCliOptions>, configFile: string, reporter: string): string {
        return _.trimEnd(
            [
                "npx",
                "playwright",
                "test",
                `--project="${options.browser}"`,
                "-c",
                configFile,
                _.trimStart([
                    options.command === "open" ? "--ui" : "",
                    reporter].join(" ")
                ),
                _.trimStart([
                    this.getTargetTestFileForPlaywright(options.targetTestFile),
                    options.extraArgs.TAGS ? `--grep ${options.extraArgs.TAGS}` : ""
                ].join(" "))
            ].join(" ")
        );
    }

    private executeSystemCommand(command: string) {
        executeSystemCommandHelper(command);
    }
}

function executeSystemCommandHelper(command: string) {
    console.log(chalk.gray(`Running command: ${command}`));
    execSync(command, { stdio: "inherit" });
}

export function executePreprocessor(projectDir: string) {
    console.log("running preprocessor...");
    executeSystemCommandHelper(`npx bddgen -c ${projectDir}/playwright.config.ts`);
    console.log("preprocessor executed\n");
}
