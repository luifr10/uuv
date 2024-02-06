/**
* Software Name : UUV
*
* SPDX-FileCopyrightText: Copyright (c) 2022-2024 Orange
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

import { LANG } from "./lang-enum";
import fs from "fs";
import { Common, getDefinedRoles } from "./common";
import * as path from "path";
import { AccessibleRole } from "./accessible-role";


export class AutocompletionSuggestion {
    suggestion !: string;
    link !: string;
}

export function runGenerateDoc(destDir: string) {
    const GENERATED_DIR_DOC = `${destDir}/docs/04-wordings/01-generated-wording-description`;
    const GENERATED_DIR_DOC_FR = `${destDir}/i18n/fr/docusaurus-plugin-content-docs/current/04-wordings/01-generated-wording-description`;

    Object.values(LANG).forEach((lang: string, index: number) => {
        const indexOfFile = (index + 1).toLocaleString("fr-FR", {
            minimumIntegerDigits: 2,
            useGrouping: false,
        });
        const generatedFile = `${GENERATED_DIR_DOC}/${indexOfFile}-${lang}-generated-wording-description.md`;
        const wordingBaseFile = path.join(__dirname, `../assets/i18n/web/${lang}/${lang}.json`);
        const wordingEnrichedFile = path.join(__dirname, `../assets/i18n/web/${lang}/${lang}-enriched-wordings.json`);
        const autocompletionSuggestionFile = path.join(GENERATED_DIR_DOC, `${lang}-autocompletion-suggestion.json`);
        cleanGeneratedFilesIfExists(generatedFile, lang, indexOfFile);
        Common.cleanGeneratedFilesIfExists(autocompletionSuggestionFile);
        generateWordingFiles(wordingBaseFile, wordingEnrichedFile, generatedFile, lang, indexOfFile, autocompletionSuggestionFile);
        fs.copyFileSync(generatedFile, `${GENERATED_DIR_DOC_FR}/${indexOfFile}-${lang}-generated-wording-description.md`);
        fs.copyFileSync(autocompletionSuggestionFile, path.join(GENERATED_DIR_DOC_FR, `${lang}-autocompletion-suggestion.json`));
    });

    function cleanGeneratedFilesIfExists(
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


    function generateWordingFiles(
        wordingBaseFile: string,
        wordingEnrichedFile: string,
        generatedFile: string,
        lang: string,
        indexOfFile: string,
        autocompletionSuggestionFile: string
    ): void {
         const { wordingFileContent, autocompletionSuggestionContent } = computeWordingFile(
             wordingBaseFile,
             wordingEnrichedFile,
             lang
         );
        writeWordingFile(generatedFile, wordingFileContent, lang, indexOfFile);
        Common.writeWordingFile(autocompletionSuggestionFile, autocompletionSuggestionContent);
    }

    function computeWordingFile(wordingBaseFile: string, wordingEnrichedFile: string, lang: string): {
        wordingFileContent: string,
        autocompletionSuggestionContent: string
    } {
        const wordingsBase = fs.readFileSync(wordingBaseFile, { encoding: "utf8" });
        const wordingsEnriched = fs.readFileSync(wordingEnrichedFile,
            { encoding: "utf8" });
        const wordingEnrichedNormalized = normalizedMdxData(wordingsEnriched);
        const wordingBaseNormalized = normalizedMdxData(wordingsBase);
        const wordingsBaseJson = JSON.parse(wordingBaseNormalized);
        const title = (function () {
            switch (lang) {
                case LANG.FR.toString():
                    return (
                        "# Français \n" +
                        ":::caution\n" +
                        "Pensez bien à rajouter `#language: fr` en entête de votre fichier feature.\n" +
                        ":::\n\n");
                default:
                    return "# English";
            }
        })();
        const autocompletionComponent = `\nimport {UuvWordingAutocomplete} from '@site/src/components/WordingAutocomplete/uuv-wording-autocomplete.js';\n\n<UuvWordingAutocomplete lang={'${lang}'}/>\n`;
        const rows = [title, autocompletionComponent];
        const autocompletionSuggestions: AutocompletionSuggestion[] = [];

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
        const { step: given, autocompletionSuggestions: givenAutocompletionSuggestions } = computeStepDefinition(
            wordingsBaseJson,
            "key.given",
            stepTitle[0],
            undefined
        );
        const { step: when, autocompletionSuggestions: whenAutocompletionSuggestions } = computeStepDefinition(
            wordingsBaseJson,
            "key.when",
            stepTitle[1],
            undefined
        );
        const { step: then, autocompletionSuggestions: thenAutocompletionSuggestions } = computeStepDefinition(
            wordingsBaseJson,
            "key.then",
            stepTitle[2],
            undefined
        );
        rows.push(...given, ...when, ...then);
        autocompletionSuggestions.push(...givenAutocompletionSuggestions, ...whenAutocompletionSuggestions, ...thenAutocompletionSuggestions);
        rows.push("## Par rôle");
        const dataOrigin: string = wordingEnrichedNormalized;
        let dataUpdated: string = dataOrigin;
        // console.debug("roles", wordingsEnrichedJson.role)
        const definedRoles = getDefinedRoles(lang);
        definedRoles.forEach((role) => {
            rows.push(`### ${role.id}`);
            // console.debug("dataUpdated", dataUpdated)
            dataUpdated = dataOrigin
                .replaceAll("$roleName", role.name)
                .replaceAll("$roleId", role.id)
                .replaceAll("$definiteArticle", role.getDefiniteArticle())
                .replaceAll("$indefiniteArticle", role.getIndefiniteArticle())
                .replaceAll("$namedAdjective", role.namedAdjective())
                .replaceAll("$ofDefiniteArticle", role.getOfDefiniteArticle());
            const wordingsEnrichedJson = JSON.parse(dataUpdated);
            const { step: enrichedGiven, autocompletionSuggestions: enrichedGivenAutocompletionSuggestions } = computeStepDefinition(
                wordingsEnrichedJson.enriched,
                "key.given",
                undefined,
                "####",
                role
            );
            if (enrichedGiven.length > 1) {
                rows.push(...enrichedGiven);
                autocompletionSuggestions.push(...enrichedGivenAutocompletionSuggestions);
            }
            const { step: enrichedWhen, autocompletionSuggestions: enrichedWhenAutocompletionSuggestions } = computeStepDefinition(
                wordingsEnrichedJson.enriched,
                "key.when",
                undefined,
                "####",
                role
            );
            if (enrichedWhen.length > 1) {
                rows.push(...enrichedWhen);
                autocompletionSuggestions.push(...enrichedWhenAutocompletionSuggestions);
            }
            const { step: enrichedThen, autocompletionSuggestions: enrichedThenAutocompletionSuggestions } = computeStepDefinition(
                wordingsEnrichedJson.enriched,
                "key.then",
                undefined,
                "####",
                role
            );
            if (enrichedThen.length > 1) {
                rows.push(...enrichedThen);
                autocompletionSuggestions.push(...enrichedThenAutocompletionSuggestions);
            }
        });


        return {
            wordingFileContent: rows.join("\n"),
            autocompletionSuggestionContent: JSON.stringify(autocompletionSuggestions)
        };
    }

    /* eslint-disable  @typescript-eslint/no-explicit-any */
    function computeStepDefinition(
        wordingsJson: any,
        stepKey: string,
        stepTitle: string | undefined,
        level: string | undefined = "###",
        role?: AccessibleRole
    ):{
        step: string[],
        autocompletionSuggestions: AutocompletionSuggestion[]
    } {
        const step: string[] = [];
        const autocompletionSuggestion: AutocompletionSuggestion[] = [];
        if (stepTitle) {
            step.push(stepTitle);
        }
        wordingsJson.forEach((conf) => {
            if (conf.key.startsWith(stepKey) && shouldGenerate(conf, role)) {
                const wording = `${level} ${conf.wording}`;
                step.push(wording);

                conf.description?.split("\\n").forEach((descriptionLine, index, array) => {
                    if (index === 0) {
                        step.push(`> ${descriptionLine ?? ""}`);
                    } else if (index === array.length - 1) {
                        step.push(` ${descriptionLine ?? ""}\n`);
                    } else {
                        step.push(` ${descriptionLine ?? ""}`);
                    }
                });

                autocompletionSuggestion.push({
                    suggestion: conf.wording
                     .replaceAll("\\", ""),
                    link: conf.wording
                        .replaceAll("{", "")
                        .replaceAll("}", "")
                        .replaceAll("(", "")
                        .replaceAll(")", "")
                        .replaceAll("'", "")
                        .replaceAll("\\", "")
                        .replaceAll(/\s/g, "-").toLowerCase()
                });
            }
        });
        return {
            step,
            autocompletionSuggestions: autocompletionSuggestion
        };
    }

    function shouldGenerate(wordingsConf: any, role?: AccessibleRole) {
        if (role === undefined) {
            return true;
        }
        switch (wordingsConf.section) {
            case "contains" :
                return role.shouldGenerateContainsSentence;
            case "type" :
                return role.shouldGenerateTypeSentence;
            default :
                return true;
        }
    }

    function writeWordingFile(generatedFile, data, lang, indexOfFile) {
        fs.writeFileSync(generatedFile, data);
            console.log(
                `[WRITE] ${indexOfFile}-${lang}-generated-wording-description.md written successfully`
            );
        }
    function normalizedMdxData(data) {
        return data.replaceAll("{string}", "\\\\{string\\\\}")
         .replaceAll("{}", "\\\\{\\\\}")
         .replaceAll("{int}", "\\\\{int\\\\}")
         .replaceAll("{key}", "\\\\{key\\\\}")
         .replaceAll("{reverseTab}", "\\\\{reverseTab\\\\}")
         .replaceAll("{tab}", "\\\\{tab\\\\}")
         .replaceAll("{down}", "\\\\{down\\\\}")
         .replaceAll("{right}", "\\\\{right\\\\}")
         .replaceAll("{left}", "\\\\{left\\\\}")
         .replaceAll("{up}", "\\\\{up\\\\}");
    }
}
