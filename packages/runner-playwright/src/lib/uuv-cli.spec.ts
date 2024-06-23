import { UUVCliEngine } from "@uuv/runner-commons";
import { UUVCliPlaywrightRunner } from "./runner-playwright";
import  { expect, test } from "@jest/globals";
import chalk from "chalk";
import fs from "fs";
import cp from "child_process";

describe("UUV Cli Playwright", () => {
  const projectDir = ".";
  const tempDir = "uuv/.uuv-features-gen";
  const initialArgs = process.argv;
  let mockExecCommand;
  let mockExit;
  let mockConsoleError;
  let mockWriteFile;

  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => {
      // Not empty
    });
    jest.spyOn(console, "debug").mockImplementation(() => {
      // Not empty
    });
    jest.spyOn(console, "info").mockImplementation(() => {
      // Not empty
    });
    jest.spyOn(console, "warn").mockImplementation(() => {
      // Not empty
    });
    mockConsoleError = jest.spyOn(console, "error").mockImplementation(() => {
      // Not empty
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should throw error when uuv is called without args", async () => {
    setProcessArguments([]);
    await getMockedRunner(projectDir);
    expect(mockConsoleError).toHaveBeenCalledWith(chalk.red("Error: No command specified"));
    expect(mockExit).toHaveBeenCalledWith(1);
  });

  test("should open playwright when uuv open is called without args", async () => {
    setProcessArguments(["open"]);
    await getMockedRunner(projectDir);
    expect(mockExecCommand).toHaveBeenNthCalledWith(1, `npx bddgen -c ${projectDir}/playwright.config.ts`);
    expect(mockExecCommand).toHaveBeenNthCalledWith(
      2,
      `npx playwright test --project="chrome" -c ${projectDir}/playwright.config.ts --ui`
    );
  });

  test("should open playwright when uuv open is called with args", async () => {
    setProcessArguments(["open", "--env={'a': 'valueA', 'b': 'valueB'}"]);
    await getMockedRunner(projectDir);
    expect(mockExecCommand).toHaveBeenNthCalledWith(1, `npx bddgen -c ${projectDir}/playwright.config.ts`);
    expect(mockExecCommand).toHaveBeenNthCalledWith(
        2,
        `npx playwright test --project="chrome" -c ${projectDir}/playwright.config.ts --ui`
    );
    // eslint-disable-next-line dot-notation
    expect(process.env["a"]).toEqual("valueA");
    // eslint-disable-next-line dot-notation
    expect(process.env["b"]).toEqual("valueB");
  });

  test("should execute e2e run playwright when uuv e2e is called without args", async () => {
    setProcessArguments(["e2e"]);
    await getMockedRunner(projectDir);
    expect(mockExecCommand).toHaveBeenNthCalledWith(1, `npx bddgen -c ${projectDir}/playwright.config.ts`);
    expect(mockExecCommand).toHaveBeenNthCalledWith(
        2,
        `npx playwright test --project="chrome" -c ${projectDir}/playwright.config.ts --reporter=@uuv/playwright/uuv-playwright-reporter`
    );
    // eslint-disable-next-line dot-notation
    expect(process.env["REPORT_TYPE"]).toEqual("console");
  });

  test("should execute e2e run cypress when uuv e2e is called with targetUrl", async () => {
    setProcessArguments(["e2e"]);
    const targetUrl = "amazingTargetUrl";
    // eslint-disable-next-line dot-notation
    process.env["UUV_BASE_URL"] = targetUrl;
    await getMockedRunner(projectDir);
    expect(mockExecCommand).toHaveBeenNthCalledWith(1, `npx bddgen -c ${projectDir}/playwright.config.ts`);
    expect(mockExecCommand).toHaveBeenNthCalledWith(
        2,
        `npx playwright test --project="chrome" -c ${projectDir}/playwright.config.ts --reporter=@uuv/playwright/uuv-playwright-reporter`
    );
    // eslint-disable-next-line dot-notation
    expect(process.env["UUV_BASE_URL"]).toEqual(targetUrl);
  });

  test("should execute e2e run playwright when uuv e2e is called with generateHtmlReport option", async () => {
    setProcessArguments(["e2e", "--generateHtmlReport"]);
    await getMockedRunner(projectDir);
    expect(mockExecCommand).toHaveBeenNthCalledWith(1, `npx bddgen -c ${projectDir}/playwright.config.ts`);
    expect(mockExecCommand).toHaveBeenNthCalledWith(
        2,
        `npx playwright test --project="chrome" -c ${projectDir}/playwright.config.ts --reporter=@uuv/playwright/uuv-playwright-reporter`
    );
    // eslint-disable-next-line dot-notation
    expect(process.env["REPORT_TYPE"]).toEqual("html");
  });

  test("should execute e2e run playwright when uuv e2e is called with generateJunitReport option", async () => {
    setProcessArguments(["e2e", "--generateJunitReport"]);
    await getMockedRunner(projectDir);
    expect(mockExecCommand).toHaveBeenNthCalledWith(1, `npx bddgen -c ${projectDir}/playwright.config.ts`);
    expect(mockExecCommand).toHaveBeenNthCalledWith(
        2,
        `npx playwright test --project="chrome" -c ${projectDir}/playwright.config.ts --reporter=@uuv/playwright/uuv-playwright-reporter,junit`
    );
    // eslint-disable-next-line dot-notation
    expect(process.env["REPORT_TYPE"]).toEqual("console");
  });

  test("should execute e2e run playwright when uuv e2e is called with generateA11yReport option", async () => {
    setProcessArguments(["e2e", "--generateA11yReport"]);
    await getMockedRunner(projectDir);
    expect(mockExecCommand).toHaveBeenNthCalledWith(1, `npx bddgen -c ${projectDir}/playwright.config.ts`);
    expect(mockExecCommand).toHaveBeenNthCalledWith(
        2,
        `npx playwright test --project="chrome" -c ${projectDir}/playwright.config.ts --reporter=@uuv/playwright/uuv-playwright-reporter`
    );
    //TODO : update this test when A11y is implemented for playwright
    // eslint-disable-next-line dot-notation
    expect(process.env["GENERATE_A11Y_REPORT"]).toBeUndefined();
  });

  test("should execute e2e run playwright when uuv e2e is called with browser option", async () => {
    const browser = "amazingBrowser";
    setProcessArguments(["e2e", `--browser=${browser}`]);
    await getMockedRunner(projectDir);
    expect(mockExecCommand).toHaveBeenNthCalledWith(1, `npx bddgen -c ${projectDir}/playwright.config.ts`);
    expect(mockExecCommand).toHaveBeenNthCalledWith(
        2,
        `npx playwright test --project="${browser}" -c ${projectDir}/playwright.config.ts --reporter=@uuv/playwright/uuv-playwright-reporter`
    );
  });

  test("should execute e2e run playwright when uuv e2e is called with targetTestFile option", async () => {
    const targetTestFile = "uuv/e2e/custom.*.feature";
    setProcessArguments(["e2e", `--targetTestFile=${targetTestFile}`]);
    await getMockedRunner(projectDir);
    expect(mockExecCommand).toHaveBeenNthCalledWith(1, `npx bddgen -c ${projectDir}/playwright.config.ts`);
    expect(mockExecCommand).toHaveBeenNthCalledWith(
        2,
        `npx playwright test --project="chrome" -c ${projectDir}/playwright.config.ts --reporter=@uuv/playwright/uuv-playwright-reporter .uuv-features-gen/custom.*.feature.spec.js`
    );
  });

  test("should execute e2e run playwright when uuv e2e is called with extraArgs option", async () => {
    const extraArgs = { a: "aValue", TAGS: "@aTag" };
    setProcessArguments(["e2e", `--env=${JSON.stringify(extraArgs)}`]);
    await getMockedRunner(projectDir);
    expect(mockExecCommand).toHaveBeenNthCalledWith(1, `npx bddgen -c ${projectDir}/playwright.config.ts`);
    expect(mockExecCommand).toHaveBeenNthCalledWith(
        2,
        `npx playwright test --project="chrome" -c ${projectDir}/playwright.config.ts --reporter=@uuv/playwright/uuv-playwright-reporter --grep @aTag`
    );
    // eslint-disable-next-line dot-notation
    expect(process.env["a"]).toEqual("aValue");
  });

  function setProcessArguments(mockedArgv: string[]) {
    jest.replaceProperty(process, "argv", [
      ...initialArgs,
      ...mockedArgv
    ]);
  }

  async function getMockedRunner(projectDir: string) {
    const runnerInstance = new UUVCliPlaywrightRunner(projectDir, tempDir);
    mockExecCommand = jest.fn(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(1);
        }, 0);
      });
    });

    // eslint-disable-next-line dot-notation
    runnerInstance["executeSystemCommand"] = mockExecCommand;
    mockExit = jest.spyOn(process, "exit").mockImplementation(() => {
      return undefined as never;
    });
    mockWriteFile = jest.spyOn(fs, "writeFileSync").mockImplementation(() => {
      return undefined as never;
    });
    jest.spyOn(cp, "fork").mockImplementation(() => {
      return undefined as any;
    });
    const engine = new UUVCliEngine(
      runnerInstance
    );

    await engine.execute();
    return runnerInstance;
  }
});

