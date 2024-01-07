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
import { Common, fs, GenerateFileProcessing } from "./common";
import * as path from "path";

export class BaseStepDefinition extends GenerateFileProcessing {
    override runGenerate() {
        Object.values(LANG).forEach((lang: string) => {
            const generatedFile = path.join(this.generatedDir, `_${lang}-generated-cucumber-steps-definition.ts`);
            Common.buildDirIfNotExists(this.generatedDir);
            Common.cleanGeneratedFilesIfExists(generatedFile);
            this.generateWordingFiles(generatedFile, lang);
        });
    }

    override generateWordingFiles(
        generatedFile: string,
        lang: string
    ): void {
        const wordingFile = path.join(this.wordingFilePath, lang, `${lang}.json`);
        const data = fs.readFileSync(
            this.stepDefinitionFile,
            { encoding: "utf8" }
        );
        const updatedData = this.computeWordingFile(data, wordingFile);
        Common.writeWordingFile(generatedFile, updatedData);
    }

    override computeWordingFile(data: string, wordingFile: string): string {
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
            .replace("import {key} from \"@uuv/runner-commons/wording/web\";", "")
            .replace("import { key } from \"@uuv/runner-commons/wording/web\";", "")
            .replace("./core-engine", "../core-engine")
            .replace("../../preprocessor/run/world", "../../../preprocessor/run/world")
            .replace("./a11y-engine", "../a11y-engine");
        const wordings = fs.readFileSync(wordingFile);
        const wordingsJson = JSON.parse(wordings.toString());
        wordingsJson.forEach((conf) => {
            data = data.replace("${" + conf.key + "}", conf.wording);
            data = data.replace(conf.key + ".description", conf.description);
            // console.debug(conf, data)
        });
        return data;
    }
}
