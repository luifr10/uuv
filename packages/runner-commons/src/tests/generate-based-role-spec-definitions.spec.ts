import fs from "fs";
import { Common, STEP_DEFINITION_FILE_NAME, TEST_RUNNER_ENUM } from "../step-definition-generator/common";
import json from "../assets/i18n/web/en/en-enriched-wordings.json";
import { BasedRoleStepDefinition } from "../step-definition-generator/generate-based-role-step-definitions";
import * as path from "path";
import { EN_ROLES } from "../assets/i18n/web/en/en-roles";

describe("tester la classe BasedRoleStepDefinition", () => {
  const dirPath = "tests";
  const filePath = "step-definition.txt";
  const template = `
    import { fr } from "../i18n/template.json";
      import { Context } from "./_context";
      import { command } from "../../cypress/commands";
      import { key } from "@uuv/runner-commons/wording/web";
      import {key} from "@uuv/runner-commons/wording/web";
      import {
          withinRoleAndName
      } from "./core-engine";

      When(\${key.when.withinElement.roleAndName}, function(name) {
        return withinRole("$roleId");
      });
    `;
  let stepDef: BasedRoleStepDefinition;
  beforeEach(() => {
    stepDef = new BasedRoleStepDefinition(dirPath, TEST_RUNNER_ENUM.CYPRESS, STEP_DEFINITION_FILE_NAME.BY_ROLE, "../assets/i18n/web");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
//
  test("classe - les attributs sont bien alimentés", () => {
    expect(stepDef.generatedDir).toEqual(path.join("tests/src/cucumber/step_definitions/cypress/generated"));
    expect(stepDef.stepDefinitionFile).toEqual(path.join("tests/src/cucumber/step_definitions/cypress/based-role-check-engine.ts"));
    expect(stepDef.baseDir).toEqual(dirPath);
  });

  test("runGenerate byRole - les attributs sont bien alimentés", () => {
    const spyBuildDir = jest.spyOn(Common, "buildDirIfNotExists").mockImplementation();
    const spyClean = jest.spyOn(Common, "cleanFolderIfExists").mockImplementation();
    const spyGenerate = jest.spyOn(stepDef, "generateWordingFiles").mockImplementation();
    stepDef.runGenerate();

    const generateDir = "tests/src/cucumber/step_definitions/cypress/generated";
    expect(spyBuildDir).toHaveBeenCalledWith(path.join(generateDir, "enriched/fr"));
    expect(spyBuildDir).toHaveBeenCalledWith(path.join(generateDir, "enriched/en"));
    expect(spyClean).toHaveBeenCalledWith(path.join(generateDir, "enriched/fr"));
    expect(spyClean).toHaveBeenCalledWith(path.join(generateDir, "enriched/en"));
    expect(spyGenerate).toHaveBeenCalledWith(path.join(generateDir, "enriched/fr/_fr-generated-steps-definition_$roleId.ts"), "fr");
    expect(spyGenerate).toHaveBeenCalledWith(path.join(generateDir, "enriched/en/_en-generated-steps-definition_$roleId.ts"), "en");
  });

  test("computeWordingFile - les attributs sont bien alimentés", () => {
    const spyReadFile = jest.spyOn(fs, "readFileSync").mockImplementation(() => JSON.stringify(json));
    const spyWrite = jest.spyOn(Common, "writeWordingFile").mockImplementation();

    stepDef.computeWordingFile(template, filePath, EN_ROLES, "mockFile");
    expect(spyReadFile).toHaveBeenCalled();
    const result = spyWrite.mock.calls[0][1];
    expect(result).toContain("NE PAS MODIFIER, FICHIER GENERE");
    expect(result).not.toContain("import {key} from \"@uuv/runner-commons/wording/web\"");
    expect(result).not.toContain("import { key } from \"@uuv/runner-commons/wording/web\"");
    expect(result).toContain("../../../core-engine");
    expect(result).toContain("../../../../../../cypress/commands");
    expect(result).toContain("../../../../i18n/template.json");
    expect(result).toContain("within an alert named {string}");
    expect(result).not.toContain("$");
    expect(result).toContain("withinRole(\"alert\")");
    expect(spyWrite).toHaveBeenCalled();
  });

  test("generateWordingFiles - le fichier doit être généré", () => {
    const spyReadFile = jest.spyOn(fs, "readFileSync").mockImplementation(() => template);
    const spyCompute = jest.spyOn(stepDef, "computeWordingFile").mockImplementation(() => template);

    stepDef.generateWordingFiles(filePath, "en");

    expect(spyReadFile).toHaveBeenCalledWith(path.join("tests/src/cucumber/step_definitions/cypress/based-role-check-engine.ts"), { encoding: "utf8" });
    expect(spyCompute).toHaveBeenCalled();
  });
});
