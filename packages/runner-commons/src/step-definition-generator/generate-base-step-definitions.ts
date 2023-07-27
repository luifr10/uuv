/**
* Software Name : UUV
* SPDX-FileCopyrightText: Copyright (c) 2022-2023 Orange
* SPDX-License-Identifier: MIT
*
* This software is distributed under the MIT License,
* the text of which is available at https://spdx.org/licenses/MIT.html
* or see the "LICENSE" file for more details.
*
* Authors: NJAKO MOLOM Louis Fredice & SERVICAL Stanley
* Software description: Make test writing fast, understandable by any human understanding English or French.
 */
import { LANG } from "./lang-enum";
import { Common, fs, GenerateFileProcessing, STEP_DEFINITION_FILE_NAME, TEST_RUNNER_ENUM } from "./common";

export class BaseStepDefinition extends GenerateFileProcessing {
    constructor(baseDir: string, runner: TEST_RUNNER_ENUM, stepDefinitionFileName: STEP_DEFINITION_FILE_NAME) {
        super(baseDir, runner, stepDefinitionFileName);
    }
    runGenerate() {
        Object.values(LANG).forEach((lang: string) => {
            const generatedFile = `${this.generatedDir}/_${lang}-generated-cucumber-steps-definition.ts`;

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            Common.buildDirIfNotExists(this.generatedDir!);
            Common.cleanGeneratedFilesIfExists(generatedFile);
            this.generateWordingFiles(generatedFile, lang);
        });
    }

    computeWordingFile(data: string, wordingFile: string): string {
        data =
            "/*******************************\n" +
            "NE PAS MODIFIER, FICHIER GENERE\n" +
            "*******************************/\n\n" +
            data;
        data = data
            .replace("./_.common", "../_.common")
            .replace("../_constant", "../../_constant")
            .replace("./_context", "../_context")
            .replace("../../../cypress/commands", "../../../../cypress/commands")
            .replace("../../../playwright/chromium", "../../../../playwright/chromium")
            .replace("../i18n/template.json", "../../i18n/template.json")
            .replace("import {key} from \"@uuv/runner-commons\";", "")
            .replace("import { key } from \"@uuv/runner-commons\";", "")
            .replace("./core-engine", "../core-engine")
            .replace("../../preprocessor/run/world", "../../../preprocessor/run/world");
        const wordings = fs.readFileSync(wordingFile);
        const wordingsJson = JSON.parse(wordings.toString());
        wordingsJson.forEach((conf) => {
            data = data.replace("${" + conf.key + "}", conf.wording);
            // console.debug(conf, data)
        });
        return data;
    }

    generateWordingFiles(
        generatedFile: string,
        lang: string
    ): void {
        const wordingFile = `${__dirname}/../assets/i18n/${lang}.json`;
        const data = fs.readFileSync(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.stepDefinitionFile!,
            { encoding: "utf8" });
        const updatedData = this.computeWordingFile(data, wordingFile);
        Common.writeWordingFile(generatedFile, updatedData);
    }
}
