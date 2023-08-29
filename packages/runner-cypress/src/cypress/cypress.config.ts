import * as webpack from "@cypress/webpack-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";

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
            fs: false
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

  on("before:run", () => {
    logTeamCity("##teamcity[progressStart 'Running UUV Tests']");
  });

  on("after:run", () => {
    logTeamCity("##teamcity[progressFinish 'Running UUV Tests']");
  });

  on("before:spec", (spec: any) => {
    if (!startedFile.includes(spec.absolute)) {
      logTeamCity(`##teamcity[testSuiteStarted ${teamcityAddName(spec.baseName)} ${teamcityFlowId(spec.baseName)}  ${teamcityAddCustomField("locationHint", "test://" + spec.absolute)} ]`);
      startedFile.push(spec.absolute);
    }
  });

  on("after:spec", (spec: any, results: CypressCommandLine.RunResult) => {
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

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}
