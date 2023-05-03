#!/usr/bin/env node


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

import report from "multiple-cucumber-html-reporter";

export async function main() {
  const chalk = require("chalk");
  const JSON_REPORT_DIR = "./uuv/reports/e2e/json";
  const HTML_REPORT_DIR = "./uuv/reports/e2e/html";
  const CUCUMBER_MESSAGES_FILE = "./uuv/cucumber-messages.ndjson";
  const fs = require("fs");
  const PROJECT_DIR = "./uuv";
  const Os = require("os");
  const isAdmin = require("is-admin");
  const figlet = require("figlet");

  figlet.text("UUV", {
    font: "Big",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 80,
    whitespaceBreak: true
  }, function(err, data) {
    if (err) {
      console.error(chalk.red("Something went wrong..."));
      console.dir(err);
      process.exit(-1);
    }
    console.log(chalk.blue(data));
  });

  if (Os.platform() === "win32" && await isAdmin()) {
    console.error(chalk.red("Please re-run this command without administrator privileges"));
    process.exit(-1);
  }

  const argv = require("minimist")(process.argv.slice(2));
  const command = findTargetCommand(argv);
  console.info(chalk.blue(`Executing UUV command ${command}...`));
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

    console.debug("Variables: ");
    console.debug(`  -> browser: ${browser}`);
    console.debug(`  -> env: ${JSON.stringify(env)}`);
    return { browser, env };
  }

  function openCypress(argv: any): Promise<any> {
    const { env } = extractArgs(argv);
    const cypress = require("cypress");
    return cypress.open({
      project: PROJECT_DIR,
      env,
    });
  }

  function runE2ETests(argv: any): Promise<any> {
    const { browser, env } = extractArgs(argv);
    const cypress = require("cypress");

    // Creating needed dirs
    if (!fs.existsSync(JSON_REPORT_DIR)) {
      fs.mkdirSync(JSON_REPORT_DIR, { recursive: true });
    }

    // Running Tests
    return cypress
      .run({
        project: PROJECT_DIR,
        browser,
        env,
      })
      .then(async (result) => {
        if (argv.generateHtmlReport) {
          console.info(chalk.blue("Generating Test Report..."));
          await generateHtmlReport(browser, argv);
        }
        if (fs.existsSync(CUCUMBER_MESSAGES_FILE)) {
          fs.rmSync(CUCUMBER_MESSAGES_FILE);
        }
        console.log(`Status ${result.totalFailed ? chalk.red("failed") : chalk.green("success")}`);
        process.exit(result.totalFailed);
      })
      .catch((err: any) => {
        console.error(chalk.red(err));
      });
  }

  async function formatCucumberMessageFile() {
    const { Formatter } = require("cucumber-json-report-formatter");
    const formatter = new Formatter();
    const outputFile = `${JSON_REPORT_DIR}/cucumber-report.json`;
    await formatter.parseCucumberJson(CUCUMBER_MESSAGES_FILE, outputFile);
  }

  function generateHtmlReportFromJson(browser: string, argv: any) {
    const UNKOWN_VALUE = "unknown";
    report.generate({
      jsonDir: JSON_REPORT_DIR,
      reportPath: HTML_REPORT_DIR,
      metadata: {
        browser: {
          name: browser,
          version: argv.browserVersion ? argv.browserVersion : "",
        },
        device: argv.device ? argv.device : UNKOWN_VALUE,
        platform: {
          name: argv.platformName ? argv.platformName : UNKOWN_VALUE,
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
}
