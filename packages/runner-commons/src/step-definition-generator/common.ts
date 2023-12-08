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

import fs from "fs";
import * as path from "path";
import { LANG } from "./lang-enum";
import { EN_ROLES } from "../assets/i18n/web/en/en-roles";
import { FR_ROLES } from "../assets/i18n/web/fr/fr-roles";
import { AccessibleRole } from "./accessible-role";

export { fs };

export abstract class GenerateFileProcessing {
    baseDir!: string;
    stepDefinitionFile!: string;
    generatedDir!: string;
    wordingFilePath !: string;

    constructor(baseDir: string, runner: TEST_RUNNER_ENUM, stepDefinitionFileName: STEP_DEFINITION_FILE_NAME, wordingFileRelativePath) {
        this.baseDir = baseDir;
        this.stepDefinitionFile = `${this.baseDir}/src/cucumber/step_definitions/${runner.toString()}/${stepDefinitionFileName.toString()}.ts`;
        this.generatedDir = `${this.baseDir}/src/cucumber/step_definitions/${runner.toString()}/generated`;
        this.stepDefinitionFile = path.join(this.baseDir, `src/cucumber/step_definitions/${runner.toString()}/${stepDefinitionFileName.toString()}.ts`);
        this.generatedDir = path.join(this.baseDir, `src/cucumber/step_definitions/${runner.toString()}/generated`);
        this.wordingFilePath = path.join(__dirname, `${wordingFileRelativePath}`);
    }

    abstract runGenerate(): void;

    abstract generateWordingFiles(generatedFile: string, lang: string);

    abstract computeWordingFile(data: string, wordingFile: string, roles?: AccessibleRole[], generatedFile?: string);
}

export function getDefinedRoles(lang: string): AccessibleRole[] {
    switch (lang) {
        case LANG.FR.toString():
            return FR_ROLES;
        default:
            return EN_ROLES;
    }
}

export enum TEST_RUNNER_ENUM {
    CYPRESS = "cypress",
    PLAYWRIGHT = "playwright"
}

export enum STEP_DEFINITION_FILE_NAME {
    BASE = "base-check-engine",
    BY_ROLE = "based-role-check-engine"
}

export enum KEY_PRESS {
    TAB = "{tab}",
    REVERSE_TAB = "{reverseTab}",
    UP = "{up}",
    DOWN = "{down}",
    LEFT = "{left}",
    RIGHT = "{right}",
}

export class Common {
    static buildDirIfNotExists(directory: string): void {
        console.log(
          `[CREATE] ${directory} CREATE successfully`
        );
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }
    }

    static cleanGeneratedFilesIfExists(
      generatedFile: string
    ): void {
        if (fs.existsSync(generatedFile)) {
            fs.rmSync(generatedFile);
            const url = generatedFile.split("/");
            console.log(
              `[DEL] ${url[url.length - 1]} deleted successfully`
            );
        }
    }

    static cleanFolderIfExists(
      folder: string
    ): void {
        if (fs.existsSync(folder)) {
            fs.rmSync(folder, { recursive: true, force: true });
            const url = folder.split("/");
            console.log(
              `[DEL] ${url[url.length - 1]} deleted successfully`
            );
        }
    }

    static writeWordingFile(
      generatedFile: string,
      data: string
    ): void {
        fs.writeFileSync(generatedFile, data);
        console.log(
          `[WRITE] ${generatedFile} written successfully`
        );
    }
}

