import * as webpack from "@cypress/webpack-preprocessor";
import { addCucumberPreprocessorPlugin, beforeRunHandler, afterRunHandler, beforeSpecHandler, afterSpecHandler } from "@badeball/cypress-cucumber-preprocessor";
import fs from "fs";

export async function setupNodeEvents (
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
  const startedFile: string[] = [];
  await addCucumberPreprocessorPlugin(on, config);
  on(
    "file:preprocessor",
    webpack.default({
      webpackOptions: {
        resolve: {
          extensions: [".ts", ".js"],
          fallback: {
            fs: false,
            path: require.resolve("path-browserify")
          }
        },
        module: {
          rules: [
            {
              test: /\.ts$/,
              exclude: [/node_modules/],
              use: [
                {
                  loader: "ts-loader",
                  options: {
                    transpileOnly: true,
                  }
                },
              ],
            },
            {
              test: /\.feature$/,
              use: [
                {
                  loader: "@badeball/cypress-cucumber-preprocessor/webpack",
                  options: config,
                },
              ],
            },
          ],
        },
      },
    })
  );

  on("before:run", async () => {
    await beforeRunHandler(config);
    const a11yReportFilePath = config.env["uuvA11yReportFilePath"];
    const generateA11yReport = config.env["generateA11yReport"];
    clearA11yReport(a11yReportFilePath);
    if (generateA11yReport === true) {
      initA11yReport(a11yReportFilePath);
    }
    logTeamCity("##teamcity[progressStart 'Running UUV Tests']");
  });

  on("after:run", async () => {
    await afterRunHandler(config);
    logTeamCity("##teamcity[progressFinish 'Running UUV Tests']");
  });

  on("before:spec", async (spec: any) => {
    if (!startedFile.includes(spec.absolute)) {
      await beforeSpecHandler(config);
      logTeamCity(`##teamcity[testSuiteStarted ${teamcityAddName(spec.baseName)} ${teamcityFlowId(spec.baseName)}  ${teamcityAddCustomField("locationHint", "test://" + spec.absolute)} ]`);
      startedFile.push(spec.absolute);
    }
  });

  on("after:spec", async (spec: any, results: CypressCommandLine.RunResult) => {
    await afterSpecHandler(config, spec, results);
    results?.tests?.forEach(test => {
      logTeamCity(`##teamcity[testStarted ${teamcityAddName(test.title[1])} ${teamcityFlowIdAndParentFlowId(test.title[1], spec.baseName)} ${teamcityAddCustomField("locationHint", "test://" + spec.absolute)} ]`);
      if (test.state === "passed") {
        // eslint-disable-next-line max-len
        logTeamCity(`##teamcity[testFinished ${teamcityAddName(test.title[1])} ${teamcityFlowIdAndParentFlowId(test.title[1], spec.baseName)} ${teamcityAddDuration(test)} ]`);
      } else if (test.state === "failed") {
        // eslint-disable-next-line max-len
        logTeamCity(`##teamcity[testFailed ${teamcityAddName(test.title[1])} ${teamcityFlowIdAndParentFlowId(test.title[1], spec.baseName)} type='comparisonFailure' message='Test failed' ]`);
        // eslint-disable-next-line max-len
        logTeamCity(`##teamcity[testFinished ${teamcityAddName(test.title[1])} ${teamcityFlowIdAndParentFlowId(test.title[1], spec.baseName)} ${teamcityAddDuration(test)} ]`);
      } else {
        logTeamCity(`##teamcity[testIgnored ${teamcityAddName(test.title[1])} ${teamcityFlowIdAndParentFlowId(test.title[1], spec.baseName)} ]`);
      }
    });
    logTeamCity(`##teamcity[testSuiteFinished ${teamcityAddName(spec.baseName)} ${teamcityFlowId(spec.baseName)}]`);
  });

  function logTeamCity(line) {
    if (config.env["enableTeamcityLogging"]) {
      console.log(line);
    }
  }

  function teamcityFlowId(name) {
    return "flowId='" + name.replaceAll("'", "|'") + "'";
  }

  function teamcityFlowIdAndParentFlowId(name, parentName) {
    return "flowId='" + name.replaceAll("'", "|'") + "' parent='" + parentName.replaceAll("'", "|'") + "'";
  }

  function teamcityAddName(name) {
    return "name='" + name.replaceAll("'", "|'") + "'";
  }

  function teamcityAddDuration(testResult) {
    return "duration='" + testResult.attempts[testResult.attempts.length - 1].wallClockDuration + "'";
  }

  function teamcityAddCustomField(fieldName, value) {
    return `${fieldName}='${value}'`;
  }

  function clearA11yReport(reportFilePath: string) {
    if (fs.existsSync(reportFilePath)) {
      fs.rmSync(reportFilePath);
    }
  }

  function initA11yReport(reportFilePath: string) {
    const emptyReport = {
      date: (new Date()).toISOString(),
      features: []
    };
    fs.writeFileSync(reportFilePath, JSON.stringify(emptyReport, null, 4), { flag: "w" });
  }

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}
