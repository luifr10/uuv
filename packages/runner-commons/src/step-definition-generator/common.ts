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

import fs from "fs";

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
    BY_ROLE = "based-role-check-engine"
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
}
