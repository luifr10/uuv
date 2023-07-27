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

import { Common, fs, GenerateFileProcessing, STEP_DEFINITION_FILE_NAME, TEST_RUNNER_ENUM } from "./common";
import { LANG } from "./lang-enum";

export class BasedRoleStepDefinition extends GenerateFileProcessing {
    constructor(baseDir: string, runner: TEST_RUNNER_ENUM, stepDefinitionFileName: STEP_DEFINITION_FILE_NAME) {
        super(baseDir, runner, stepDefinitionFileName);
    }
    generatedFile = "";
    runGenerate() {
        Object.values(LANG).forEach((lang: string) => {
            const generatedSubfolder = `enriched/${lang}`;
            const generatedFolder = `${this.generatedDir}/${generatedSubfolder}`;
            Common.cleanFolderIfExists(generatedFolder);
            Common.buildDirIfNotExists(generatedFolder);
            this.generatedFile = `${generatedFolder}/_${lang}-generated-steps-definition_$roleId.ts`;
            // console.debug("generatedFile template", this.generatedFile)
            this.generateWordingFiles(this.generatedFile, lang);
        });
    }
    generateWordingFiles(
        generatedFile: string,
        lang: string
    ): void {
        const wordingFile = `${__dirname}/../assets/i18n/${lang}-enriched-wordings.json`;
        const data = fs.readFileSync(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.stepDefinitionFile!,
            { encoding: "utf8" });
        this.computeWordingFile(data, wordingFile);
    }

    computeWordingFile(data: string, wordingFile: string): void {
        const dataOrigin: string = data;
        let dataUpdated: string = dataOrigin;
        const wordings = fs.readFileSync(wordingFile);
        const wordingsJson = JSON.parse(wordings.toString());
        wordingsJson.role.forEach((role) => {
            // console.debug("role", role)
            dataUpdated =
                "/*******************************\n" +
                "NE PAS MODIFIER, FICHIER GENERE\n" +
                "*******************************/\n\n" +
                dataOrigin;
            dataUpdated = dataUpdated
                .replace("../../cypress/commands", "../../../../../../cypress/commands")
                .replace("../i18n/template.json", "../../../../i18n/template.json")
                .replace("import { key } from \"@uuv/runner-commons\";", "")
                .replace("import {key} from \"@uuv/runner-commons\";", "")
                .replace("./core-engine", "../../../core-engine")
                .replace("../../preprocessor/run/world", "../../../../../preprocessor/run/world");
            wordingsJson.enriched.forEach((conf) => {
                // console.debug(">> conf", conf)
                // console.debug("${" + conf.key + "}");
                dataUpdated = dataUpdated
                    .replaceAll("${" + conf.key + "}", conf.wording)
                    .replaceAll("$roleId", role.id)
                    .replaceAll("$roleName", role.name);
            });
            const generatedFilename = this.generatedFile.replace("$roleId", role.id);
            // console.debug(">>> data", dataUpdated)
            // console.debug(">>> generatedFilename", generatedFilename)
            Common.writeWordingFile(generatedFilename, dataUpdated);
        });
    }

}
