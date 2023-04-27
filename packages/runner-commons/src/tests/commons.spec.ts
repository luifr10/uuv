import fs from "fs";
import { Common } from "../step-definition-generator/common";

describe("tester la classe common", () => {
  const dirPath = "tests";
  const filePath = "test.txt";
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("buildDirIfNotExists - le dossier n'est pas créé", () => {
    const spyExist = jest.spyOn(fs, "existsSync").mockImplementation(() => true);
    const spyMkDir = jest.spyOn(fs, "mkdirSync").mockImplementation();
    Common.buildDirIfNotExists(dirPath);
    expect(spyExist).toHaveBeenCalled();
    expect(spyMkDir).not.toHaveBeenCalled();
  });

  test("buildDirIfNotExists - le dossier est créé", () => {
    const spyExist = jest.spyOn(fs, "existsSync").mockImplementation(() => false);
    const spyMkDir = jest.spyOn(fs, "mkdirSync").mockImplementation();
    Common.buildDirIfNotExists(dirPath);
    expect(spyExist).toHaveBeenCalled();
    expect(spyMkDir).toHaveBeenCalled();
  });

  test("cleanGeneratedFilesIfExists - les fichiers sont supprimés", () => {
    const spyExist = jest.spyOn(fs, "existsSync").mockImplementation(() => true);
    const spyRm = jest.spyOn(fs, "rmSync").mockImplementation();
    Common.cleanGeneratedFilesIfExists(filePath);
    expect(spyExist).toHaveBeenCalled();
    expect(spyRm).toHaveBeenCalled();
  });

  test("cleanGeneratedFilesIfExists - les fichiers ne sont pas supprimés", () => {
    const spyExist = jest.spyOn(fs, "existsSync").mockImplementation(() => false);
    const spyRm = jest.spyOn(fs, "rmSync").mockImplementation();
    Common.cleanGeneratedFilesIfExists(filePath);
    expect(spyExist).toHaveBeenCalled();
    expect(spyRm).not.toHaveBeenCalled();
  });

  test("cleanFolderIfExists - le dossier est supprimé", () => {
    const spyExist = jest.spyOn(fs, "existsSync").mockImplementation(() => true);
    const spyRm = jest.spyOn(fs, "rmSync").mockImplementation();
    Common.cleanFolderIfExists(dirPath);
    expect(spyExist).toHaveBeenCalled();
    expect(spyRm).toHaveBeenCalled();
  });

  test("cleanFolderIfExists - le dossier n'est pas supprimé", () => {
    const spyExist = jest.spyOn(fs, "existsSync").mockImplementation(() => false);
    const spyRm = jest.spyOn(fs, "rmSync").mockImplementation();
    Common.cleanFolderIfExists(dirPath);
    expect(spyExist).toHaveBeenCalled();
    expect(spyRm).not.toHaveBeenCalled();
  });

  test("writeWordingFile - l'écriture est fait", () => {
    const spyWrite = jest.spyOn(fs, "writeFileSync").mockImplementation();
    Common.writeWordingFile(filePath, "data");
    expect(spyWrite).toHaveBeenCalled();
  });
});
