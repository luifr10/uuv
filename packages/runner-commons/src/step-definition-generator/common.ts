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
import glob from "glob";

export { fs };

export abstract class GenerateFileProcessing {
    baseDir?: string;
    stepDefinitionFile?: string = "";
    generatedDir?: string = "";

    protected constructor(baseDir: string, runner: TEST_RUNNER_ENUM, stepDefinitionFileName: STEP_DEFINITION_FILE_NAME) {
        this.baseDir = baseDir;
        this.stepDefinitionFile = `${this.baseDir}/src/cucumber/step_definitions/${runner.toString()}/${stepDefinitionFileName.toString()}.ts`;
        this.generatedDir = `${this.baseDir}/src/cucumber/step_definitions/${runner.toString()}/generated`;
    }

    abstract runGenerate(): void;

    abstract generateWordingFiles(generatedFile: string,
                                  lang: string);

    abstract computeWordingFile(data: string, wordingFile: string);
}

export enum TEST_RUNNER_ENUM {
    CYPRESS = "cypress",
    PLAYWRIGHT = "playwright"
}

export enum STEP_DEFINITION_FILE_NAME {
    BASE = "base-check-engine",
    BY_ROLE = "based-role-check-engine",
    BY_SCENARIO_TEMPLATE = "_playbook-engine",
}

export enum UUV_ENVELOPE {
    PLAYBOOK = "playbook.feature",
    PLAYBOOKED = "playbooked.feature",
    PLAYBOOKED_GEN = "playbooked.generated.feature",
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

   static getFileList(dirName) {
        let files : string[] = [];
        const items = fs.readdirSync(dirName, { withFileTypes: true });
        for (const item of items) {
            if (item.isDirectory()) {
                files = [
                    ...files,
                    ...(Common.getFileList(`${dirName}/${item.name}`)),
                ];
            } else {
                files.push(`${dirName}/${item.name}`);
            }
        }

        return files;
    }
}
