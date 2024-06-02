# Migrations of 2.x.x minor or patch

## Rationalize list sentences
For `@uuv/cypress 2.6.0 -> 2.7.0` and `@uuv/playwright 2.5.0 -> 2.6.0`
- The following sentences have been removed:
  - `I should see a list named {string} and containing {string} disabled`
  - `I should see a list named {string} and containing {string} enabled`
- The sentence `I should see elements of the list with name {string}` has been transformed into `I should see a list named {string} and containing`

## Update dependency badeball-cypress-cucumber from v16 to v20
For `@uuv/cypress 2.18.0 -> 2.19.0`
- Move file `.cypress-cucumber-preprocessorrc.json` to `uuv` folder

## Fix report issue
For `@uuv/cypress 2.21.0 -> 2.21.1`
- Update the content of `uuv/.cypress-cucumber-preprocessorrc.json` file :
  ```json
  {
    "stepDefinitions": [
      "cucumber/step_definitions/**/*.{js,ts}",
      "../node_modules/@uuv/cypress/dist/cucumber/step_definitions/cypress/{generated,unsafe}/**/*.{js,ts}"
    ],
    "messages": {
      "enabled": true
    },
    "json": {
      "enabled": true,
      "output": "reports/e2e/json/cucumber-report.json"
    }
  }
  ```
