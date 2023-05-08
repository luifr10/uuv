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
import fs from "fs";

class Common {
    static cleanGeneratedFilesIfExists(
        generatedFile: string,
        lang: string,
        indexOfFile: string
    ): void {
        if (fs.existsSync(generatedFile)) {
            fs.rmSync(generatedFile);
            console.log(
                `[DEL] ${indexOfFile}-${lang}-generated-wording-description.md deleted successfully`
            );
        }
    }
}

export function runGenerateDoc(destDir: string) {
    const GENERATED_DIR_DOC = `${destDir}/docs/03-wordings/01-generated-wording-description`;
    const GENERATED_DIR_DOC_FR = `${destDir}/i18n/fr/docusaurus-plugin-content-docs/current/03-wordings/01-generated-wording-description`;

    Object.values(LANG).forEach((lang: string, index: number) => {
        const indexOfFile = (index + 1).toLocaleString("fr-FR", {
            minimumIntegerDigits: 2,
            useGrouping: false,
        });
        const generatedFile = `${GENERATED_DIR_DOC}/${indexOfFile}-${lang}-generated-wording-description.md`;
        const wordingBaseFile = `${__dirname}/../assets/i18n/${lang}.json`;
        const wordingEnrichedFile = `${__dirname}/../assets/i18n/${lang}-enriched-wordings.json`;
        Common.cleanGeneratedFilesIfExists(generatedFile, lang, indexOfFile);
        generateWordingFiles(wordingBaseFile, wordingEnrichedFile, generatedFile, lang, indexOfFile);
        fs.copyFileSync(generatedFile, `${GENERATED_DIR_DOC_FR}/${indexOfFile}-${lang}-generated-wording-description.md`);
    });


    function generateWordingFiles(
        wordingBaseFile: string,
        wordingEnrichedFile: string,
        generatedFile: string,
        lang: string,
        indexOfFile: string
    ): void {
        const data = computeWordingFile(wordingBaseFile, wordingEnrichedFile, lang);
        writeWordingFile(generatedFile, data, lang, indexOfFile);
    }

    function computeWordingFile(wordingBaseFile: string, wordingEnrichedFile: string, lang: string): string {
        const wordingsBase = fs.readFileSync(wordingBaseFile);
        const wordingsBaseJson = JSON.parse(wordingsBase.toString());
        const wordingsEnriched = fs.readFileSync(wordingEnrichedFile,
            { encoding: "utf8" });
        const title = (function () {
            switch (lang) {
                case LANG.FR.toString():
                    return (
                        "# Français \n" +
                        ":::caution\n" +
                        "Pensez bien à rajouter `#language: fr` en entête de votre fichier feature.\n" +
                        ":::\n\n");
                default:
                    return "# Anglais";
            }
        })();
        const rows = [title];

        const stepTitle: string[] = (function () {
            switch (lang) {
                case LANG.FR.toString():
                    return ["## Etant donné que", "## Quand", "## Alors"];
                case LANG.EN.toString():
                    return ["## Given", "## When", "## Then"];
                default:
                    return ["", "", ""];
            }
        })();
        const given = computeStepDefinition(
            wordingsBaseJson,
            "key.given",
            stepTitle[0]
        );
        const when = computeStepDefinition(wordingsBaseJson, "key.when", stepTitle[1]);
        const then = computeStepDefinition(wordingsBaseJson, "key.then", stepTitle[2]);
        rows.push(...given, ...when, ...then);
        rows.push("## Par rôle");
        const dataOrigin: string = wordingsEnriched;
        let dataUpdated: string = dataOrigin;
        // console.debug("roles", wordingsEnrichedJson.role)
        const wordingsEnrichedJson = JSON.parse(dataUpdated);
        wordingsEnrichedJson.role.forEach((role) => {
            rows.push(`### ${role.id}`);
            // console.debug("dataUpdated", dataUpdated)
            dataUpdated = dataOrigin
                .replaceAll("$roleName", role.name)
                .replaceAll("$roleId", role.id);
            const wordingsEnrichedJson = JSON.parse(dataUpdated);
            const enrichedGiven = computeStepDefinition(
                wordingsEnrichedJson.enriched,
                "key.given",
                undefined,
                "####"
            );
            if (enrichedGiven.length > 1) {
                rows.push(...enrichedGiven);
            }
            const enrichedWhen = computeStepDefinition(
                wordingsEnrichedJson.enriched,
                "key.when",
                undefined,
                "####"
            );
            if (enrichedWhen.length > 1) {
                rows.push(...enrichedWhen);
            }
            const enrichedThen = computeStepDefinition(
                wordingsEnrichedJson.enriched,
                "key.then",
                undefined,
                "####"
            );
            if (enrichedThen.length > 1) {
                rows.push(...enrichedThen);
            }
        });


        return rows.join("\n");
    }

    /* eslint-disable  @typescript-eslint/no-explicit-any */
    function computeStepDefinition(
        wordingsJson: any,
        stepKey: string,
        stepTitle: string | undefined,
        level: string | undefined = "###"
    ) {
        const step: string[] = [];
        if (stepTitle) {
            step.push(stepTitle);
        }
        wordingsJson.forEach((conf) => {
            if (conf.key.startsWith(stepKey)) {
                const wording = `${level} ${conf.wording}`;
                step.push(wording);
                step.push(`> ${conf.description ?? ""}\n`);
            }
        });
        return step;
    }

    function writeWordingFile(generatedFile, data, lang, indexOfFile) {
        fs.writeFileSync(generatedFile, data);
            console.log(
                `[WRITE] ${indexOfFile}-${lang}-generated-wording-description.md written successfully`
            );
        }
}
