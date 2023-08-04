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

import { Common, fs, GenerateFileProcessing, STEP_DEFINITION_FILE_NAME, TEST_RUNNER_ENUM, UUV_ENVELOPE } from "./common";
import chalk from "chalk";

export class PlaybookStepDefinition extends GenerateFileProcessing {
  override generatedDir = "";
  UUV_FOLDER = `${this.baseDir}/e2e`;
  SCENARIO_REGEXP = RegExp("(Scenario: |Scénario: |Scenario : |Scénario : |Scenario:|Scénario:|Scenario :|Scénario :)(.+)");

  constructor(baseDir: string, runner: TEST_RUNNER_ENUM, stepDefinitionFileName: STEP_DEFINITION_FILE_NAME) {
    super(baseDir, runner, stepDefinitionFileName);
  }

  runGenerate() {
    this.generatedDir = `${this.UUV_FOLDER}/generated`;
    const generatedStepDefinitionDir = `${this.UUV_FOLDER}/../generated/`;
    const generatedFile = `${generatedStepDefinitionDir}_playbook-step-definitions.ts`;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    Common.cleanFolderIfExists(this.generatedDir);
    Common.buildDirIfNotExists(this.generatedDir);
    Common.cleanFolderIfExists(generatedStepDefinitionDir);
    Common.buildDirIfNotExists(generatedStepDefinitionDir);
    this.generateWordingFiles(generatedFile);
  }

  computeWordingFile(data: string, wordingFile: string): string {
    data =
     "/*******************************\n" +
     "NE PAS MODIFIER, FICHIER GENERE\n" +
     "*******************************/\n\n" +
     data;
    const foundPlaybookedFile = this.initializeGeneratedPlaybookedFile();
    Common.getFileList(this.UUV_FOLDER).forEach(file => {
      // chaque template
      if (file.includes(UUV_ENVELOPE.PLAYBOOK.toString())) {
        const templateFile = fs.readFileSync(file);
        // récupère noms scénario
        const scenarioRow = templateFile.toString().split(this.SCENARIO_REGEXP);
        if (scenarioRow) {
          // chaque scénario
          scenarioRow.forEach((value, index) => {
            if (value.includes("Scenario") || value.includes("Scénario")) {
              if (index + 1 <= scenarioRow.length) {
                const scenarioName = scenarioRow[index + 1];
                const scenarioSteps = scenarioRow[index + 2];
                if (foundPlaybookedFile) {
                  this.generatePlaybookedFile(scenarioName, scenarioSteps);
                }
                // construit la phrase cucumber
                data += `Given("${scenarioName}", function() {
        return;
      });
`;
              }
            }
          });
        }
      }
    });
    return data;
  }

  generateWordingFiles(
   generatedFile: string
  ): void {
    const wordingFile = `${__dirname}/uuv/template-config.json`;
    const definitionSteps = fs.readFileSync(
     this.stepDefinitionFile!,
     { encoding: "utf8" });
    const updatedData = this.computeWordingFile(definitionSteps, wordingFile);
    Common.writeWordingFile(generatedFile, updatedData);
  }

  private generatePlaybookedFile(wording, steps): void {
    const stepsToCopy = `
      ##### Start playbook "Given ${wording}"
${steps}
      ##### End playbook

        `;
    Common.getFileList(this.UUV_FOLDER).forEach(file => {
      if (file.includes(UUV_ENVELOPE.PLAYBOOKED.toString())) {
        const fileNamePath = file.split("/");
        const fileName = fileNamePath[fileNamePath.length - 1];
        const generatedPlaybookedFile = fs.readFileSync(`${this.generatedDir}/_${fileName.replace(UUV_ENVELOPE.PLAYBOOKED.toString(), UUV_ENVELOPE.PLAYBOOKED_GEN.toString())}`).toString();
        const generatedPlaybookedFileUpdated = generatedPlaybookedFile.replaceAll(RegExp(`Given ${wording}$`, "gm"), stepsToCopy);
        const consumerFileNameTab = file.split(".");
        let generatedFeatureName = consumerFileNameTab[consumerFileNameTab.length - 3].concat(`.${UUV_ENVELOPE.PLAYBOOKED_GEN.toString()}`);
        const generatedFeaturePathSplitByDir = generatedFeatureName.split("/");
        if (generatedFeaturePathSplitByDir.length > 1) {
          generatedFeatureName = generatedFeaturePathSplitByDir[generatedFeaturePathSplitByDir.length - 1];
        }
        Common.writeWordingFile(this.generatedDir + "/_" + generatedFeatureName, generatedPlaybookedFileUpdated);
      }
    });
  }

  private initializeGeneratedPlaybookedFile(): boolean {
    let foundPlaybook = false;
    Common.getFileList(this.UUV_FOLDER).forEach(file => {
      if (file.includes(UUV_ENVELOPE.PLAYBOOKED.toString())) {
        foundPlaybook = true;
        const fileContent = fs.readFileSync(file).toString();
        const fileNamePath = file.split("/");
        const fileName = fileNamePath[fileNamePath.length - 1];
        Common.writeWordingFile(this.generatedDir + "/_" + fileName.replace(UUV_ENVELOPE.PLAYBOOKED.toString(), UUV_ENVELOPE.PLAYBOOKED_GEN.toString()), fileContent);
      }
    });
    if (!foundPlaybook) {
      console.error(chalk.red("no playbook found at path ./e2e"));
    }
    return foundPlaybook;
  }
}
