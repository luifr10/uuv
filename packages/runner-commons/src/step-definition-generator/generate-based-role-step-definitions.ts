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

import { Common, fs, GenerateFileProcessing, getDefinedRoles } from "./common";
import { LANG } from "./lang-enum";
import * as path from "path";
import { AccessibleRole } from "./accessible-role";

export class BasedRoleStepDefinition extends GenerateFileProcessing {
    override runGenerate() {
        Object.values(LANG).forEach((lang: string) => {
            const generatedSubfolder = `enriched/${lang}`;
            const generatedFolder = path.join(this.generatedDir, generatedSubfolder);
            Common.cleanFolderIfExists(generatedFolder);
            Common.buildDirIfNotExists(generatedFolder);
            const generatedFile = path.join(generatedFolder, `_${lang}-generated-steps-definition_$roleId.ts`);
            // console.debug("generatedFile template", this.generatedFile)
            this.generateWordingFiles(generatedFile, lang);
        });
    }
    override generateWordingFiles(
        generatedFile: string,
        lang: string
    ): void {
        const wordingFile = path.join(this.wordingFilePath, lang, `${lang}-enriched-wordings.json`);
        const data = fs.readFileSync(
            this.stepDefinitionFile,
            { encoding: "utf8" }
        );
        const definedRoles = getDefinedRoles(lang);
        this.computeWordingFile(data, wordingFile, definedRoles, generatedFile);
    }

    override computeWordingFile(data: string, wordingFile: string, definedRoles: AccessibleRole[], generatedFile: string): void {
        const dataOrigin: string = data;
        let dataUpdated: string = dataOrigin;
        const wordings = fs.readFileSync(wordingFile);
        const wordingsJson = JSON.parse(wordings.toString());
        definedRoles.forEach((role) => {
            // console.debug("role", role)
            dataUpdated =
                "/*******************************\n" +
                "NE PAS MODIFIER, FICHIER GENERE\n" +
                "*******************************/\n\n" +
                dataOrigin;
            dataUpdated = dataUpdated
                .replace("../../cypress/commands", "../../../../../../cypress/commands")
                .replace("../i18n/template.json", "../../../../i18n/template.json")
                .replace("import { key } from \"@uuv/runner-commons/wording/web\";", "")
                .replace("import {key} from \"@uuv/runner-commons/wording/web\";", "")
                .replace("./core-engine", "../../../core-engine")
                .replace("../../preprocessor/run/world", "../../../../../preprocessor/run/world");
            wordingsJson.enriched.forEach((conf) => {
                // console.debug(">> conf", conf)
                // console.debug("${" + conf.key + "}");
                dataUpdated = dataUpdated
                    .replaceAll("${" + conf.key + "}", conf.wording)
                    .replaceAll("$roleId", role.id)
                    .replaceAll("$roleName", role.name)
                    .replaceAll("$definiteArticle", role.getDefiniteArticle())
                    .replaceAll("$indefiniteArticle", role.getIndefiniteArticle())
                    .replaceAll("$namedAdjective", role.namedAdjective())
                    .replaceAll("$ofDefiniteArticle", role.getOfDefiniteArticle())
                    .replaceAll(conf.key + ".description", conf.description);
            });

            // Exclude Role based Content sentence if specified
            if (!role.shouldGenerateContainsSentence) {
                dataUpdated = dataUpdated.replace(/\/\/ Begin of Content Section[\s\S]*?\/\/ End of Content Section/, "");
            }

            // Exclude Role based Type sentence if specified
            if (!role.shouldGenerateTypeSentence) {
                dataUpdated = dataUpdated.replace(/\/\/ Begin of Type Section[\s\S]*?\/\/ End of Type Section/, "");
            }

            // Exclude Role based Keyboard sentence if specified
            if (!role.shouldGenerateKeyboardSentence) {
                dataUpdated = dataUpdated.replace(/\/\/ Begin of Keyboard Section[\s\S]*?\/\/ End of Keyboard Section/, "");
            }

            const generatedFilename = generatedFile.replace("$roleId", role.id);
            // console.debug(">>> data", dataUpdated)
            // console.debug(">>> generatedFilename", generatedFilename)
            Common.writeWordingFile(generatedFilename, dataUpdated);
        });
    }

}
