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
