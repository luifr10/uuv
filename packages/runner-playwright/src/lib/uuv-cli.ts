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
import chalk from "chalk";
import figlet from "figlet";
import { Formatter } from "cucumber-json-report-formatter";

import minimist from "minimist";
import { run } from "./runner-playwright";

main();

async function main() {
  const JSON_REPORT_DIR = "./uuv/reports/e2e/json";
  const HTML_REPORT_DIR = "./uuv/reports/e2e/html";
  const CUCUMBER_MESSAGES_FILE = "./uuv/cucumber-messages.ndjson";
  const FEATURE_GEN_DIR = ".uuv-features-gen";
  const PROJECT_DIR = "uuv";
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

  const argv = minimist(process.argv.slice(2));
  const command = findTargetCommand(argv);
  console.info(chalk.blue(`Executing UUV command ${command}...`));
  switch (command) {
    case "open":
      await openPlaywright(argv);
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

  function openPlaywright(argv: any): Promise<any> {
    // TODO Implementer les paramètres env en json
    //const { env } = extractArgs(argv);
    return run( "open", FEATURE_GEN_DIR, PROJECT_DIR);
  }

  function runE2ETests(argv: any): Promise<any> {
    const { browser, env } = extractArgs(argv);

    // TODO Manage HTML Report
    // Creating needed dirs
    // if (!fs.existsSync(JSON_REPORT_DIR)) {
    //   fs.mkdirSync(JSON_REPORT_DIR, { recursive: true });
    // }

    // Running Tests
    return run( "e2e", FEATURE_GEN_DIR, PROJECT_DIR)
        .then(async (result) => {
          // TODO Manage HTML Report
          // if (argv.generateHtmlReport) {
          //   console.info(chalk.blue("Generating Test Report..."));
          //   await generateHtmlReport(browser, argv);
          // }
          // if (fs.existsSync(CUCUMBER_MESSAGES_FILE)) {
          //   fs.rmSync(CUCUMBER_MESSAGES_FILE);
          // }
          console.log(`Status ${chalk.green("success")}`);
      })
      .catch((err: any) => {
        console.error(chalk.red(err));
        process.exit(-1);
      });
  }

  async function formatCucumberMessageFile() {
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
