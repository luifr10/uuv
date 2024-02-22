#!/usr/bin/env node


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

import report from "multiple-cucumber-html-reporter";
import chalk from "chalk";
import figlet from "figlet";
import minimist from "minimist";
import fs from "fs";
import cypress from "cypress";
import { UuvCustomFormatter } from "../cucumber/uuv-custom-formatter";
import path from "path";


export async function main(projectDir = "./uuv") {
  const REPORT_DIR = path.join(projectDir, "reports");
  const E2E_REPORT_DIR = path.join(projectDir, "reports/e2e");
  const JSON_REPORT_DIR = path.join(projectDir, "reports/e2e/json");
  const HTML_REPORT_DIR = path.join(projectDir, "reports/e2e/html");
  const CYPRESS_JUNIT_REPORT = [`${projectDir}/reports/e2e/junit-report-*.xml`];
  const JUNIT_UNIFIED_REPORT = `${projectDir}/reports/e2e/junit-report.xml`;
  const CUCUMBER_MESSAGES_FILE = path.join(projectDir, "cucumber-messages.ndjson");

  printBanner(getCurrentVersion);

  const argv = minimist(process.argv.slice(2));
  const command = findTargetCommand(argv);
  console.info(chalk.blueBright(`Executing UUV command ${command}...`));
  if (!fs.existsSync(REPORT_DIR)) {
    fs.mkdirSync(REPORT_DIR);
  }

  if (fs.existsSync(E2E_REPORT_DIR)) {
    deleteAllFileOfDirectory(E2E_REPORT_DIR);
  }

  switch (command) {
    case "open":
      await openCypress(argv);
      break;
    case "e2e":
      await runE2ETests(argv);
      break;
    default:
      console.error(chalk.red("Unknown command"));
      process.exit(1);
  }
  console.info(`UUV command ${command} executed`);

  function extractArgs(argv: any) {
    const browser = argv.browser ? argv.browser : "chrome";
    const env = argv.env ? JSON.parse(argv.env.replace(/'/g, "\"")) : {};
    const targetTestFile = argv.targetTestFile ? argv.targetTestFile : null;
    if (argv.generateA11yReport) {
      env.uuvA11yReportFilePath = `${process.cwd()}/${REPORT_DIR}/a11y-report.json`;
      env.generateA11yReport = argv.generateA11yReport;
    }
    env.generateJunitReport = argv.generateJunitReport;
    env.generateHtmlReport = argv.generateHtmlReport;

    console.debug("Variables: ");
    console.debug(`  -> browser: ${browser}`);
    console.debug(`  -> env: ${JSON.stringify(env)}`);
    if (targetTestFile) {
      console.debug(`  -> targetTestFile: ${targetTestFile}`);
    }
    return { browser, env, targetTestFile };
  }

  function openCypress(argv: any): Promise<any> {
    const { env } = extractArgs(argv);
    return cypress.open({
      project: projectDir,
      env,
    });
  }

  function runE2ETests(argv: any): Promise<any> {
    const { browser, env, targetTestFile } = extractArgs(argv);
    const options: Partial<CypressCommandLine.CypressRunOptions> = {
      project: projectDir,
      browser,
      env
    };

    if (env.generateJunitReport) {
      options.reporter = "junit";
      options.reporterOptions = {
        mochaFile: "reports/e2e/junit-report-[hash].xml"
      };
    }

    if (targetTestFile) {
      options.spec = targetTestFile;
    }

    // Running Tests
    return cypress
      .run(options)
      .then(async (result) => {
        if (env.generateJunitReport) {
          await mergeJunitReport(CYPRESS_JUNIT_REPORT,  JUNIT_UNIFIED_REPORT);
        }
        if (env.generateHtmlReport) {
          console.info(chalk.blueBright("Generating Html Test Report..."));
          await generateHtmlReport(browser, argv);
        }
        if (fs.existsSync(CUCUMBER_MESSAGES_FILE)) {
          fs.rmSync(CUCUMBER_MESSAGES_FILE);
        }
        if ("totalFailed" in result) {
          console.log(`Status ${result.totalFailed ? chalk.red("failed") : chalk.green("success")}`);
          process.exit(result.totalFailed);
        }
        process.exit();
      })
      .catch(async (err: any) => {
        console.error(chalk.red(err));
        if (env.generateJunitReport) {
          await mergeJunitReport(CYPRESS_JUNIT_REPORT, JUNIT_UNIFIED_REPORT);
        }
        process.exit(-1);
      });
  }

  async function formatCucumberMessageFile() {
    // Creating needed dirs
    if (!fs.existsSync(JSON_REPORT_DIR)) {
      fs.mkdirSync(JSON_REPORT_DIR, { recursive: true });
    }

    const formatter = new UuvCustomFormatter();
    const outputFile = `${JSON_REPORT_DIR}/cucumber-report.json`;
    await formatter.parseCucumberJson(CUCUMBER_MESSAGES_FILE, outputFile);
  }

  function generateHtmlReportFromJson(browser: string, argv: any) {
    const UNKNOWN_VALUE = "unknown";
    report.generate({
      jsonDir: JSON_REPORT_DIR,
      reportPath: HTML_REPORT_DIR,
      metadata: {
        browser: {
          name: browser,
          version: argv.browserVersion ? argv.browserVersion : "",
        },
        device: argv.device ? argv.device : UNKNOWN_VALUE,
        platform: {
          name: argv.platformName ? argv.platformName : UNKNOWN_VALUE,
          version: argv.platformVersion ? argv.platformVersion : "",
        },
      },
    });
  }

  async function generateHtmlReport(browser: string, argv: any) {
    await formatCucumberMessageFile();
    generateHtmlReportFromJson(browser, argv);
  }

  function findTargetCommand(argv: any) {
    if (argv._.length < 1) {
      console.error(chalk.red("No command specified"));
      process.exit(1);
    }
    const command = argv._[0];
    return command;
  }

  function printBanner(getCurrentVersion: () => string) {
    console.log(
        chalk.blueBright(
            figlet.textSync("UUV - Cypress", {
              font: "Big",
              horizontalLayout: "default",
              verticalLayout: "default",
              width: 80,
              whitespaceBreak: true
            })
        )
    );
    console.info(chalk.blueBright(`Version: ${getCurrentVersion()}\n\n`));
  }

  function getCurrentVersion(): string {
    const pJsonStr = fs.readFileSync(`${__dirname}/../../package.json`, {
      encoding: "utf8", flag: "r"
    });
    return JSON.parse(pJsonStr).version;
  }

  async function mergeJunitReport(inputFiles: string[], outputFile: string) {
    const { mergeFiles } = require("junit-report-merger");
    console.info(chalk.blueBright("Generating Junit Test Report..."));
    await mergeFiles(outputFile, inputFiles);
    console.info(chalk.blueBright(`Junit Test Report generated: ${outputFile}`));
  }

  function deleteAllFileOfDirectory(dirPath) {
    for (const file of fs.readdirSync(dirPath)) {
      const filePath = path.join(dirPath, file);
      if (fs.lstatSync(filePath).isFile()) {
        fs.rmSync(filePath);
      }
    }
  }
}
