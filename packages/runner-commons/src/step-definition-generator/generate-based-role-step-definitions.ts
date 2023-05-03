/**
 * Copyright UUV.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
