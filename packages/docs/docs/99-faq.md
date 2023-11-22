import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# FAQ

## How to upload test execution results to Jira XRAY ?
:::caution
First of all, when writing your scenarios, you need to **tag each scenario node** with the Jira test id.<br/>
For example, for the Jira test `MyProject-Test-1` :
```gherkin title='uuv/e2e/first-test.feature'
Feature: Hello World

  // highlight-start
  @MyProject-Test-1
  // highlight-end
  Scenario: Search - Successful case
    When I visit path "/"
    Then I should see an element with role "heading" and name "My app title"
```
:::
To upload test execution results to Jira XRAY, simply send the report file generated `uuv/reports/e2e/json/cucumber-report.json` after execution :
<Tabs>
<TabItem value="curl" label="curl">

```shell
curl -v -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <jira_personal_access_token>" -d @uuv/reports/e2e/json/cucumber-report.json https://<jira_base_url>/rest/raven/1.0/import/execution/cucumber
```

</TabItem>
</Tabs>

## Cannot run the tests from console ?

<Tabs>
<TabItem value="cypress" label="Cypress">

:::info
This step is only necessary if you have chosen the `Cypress` runner and you cannot [run the tests normally](/docs/test/running-test).
:::
Edit the `package.json` file to add the following line in the script section :

```json title='package.json'
{
...
    "scripts": {
        "...
        "uuv": "node node_modules/@uuv/cypress/bin/uuv"
    },
  ...
}
```

</TabItem>
<TabItem value="playwright" label="Playwright">

:::info
This step is only necessary if you have chosen the `Playwright` runner and you cannot [run the tests normally](/docs/test/running-test).
:::
Edit the `package.json` file to add the following line in the script section :

```json title='package.json'
{
...
    "scripts": {
        "...
        "uuv": "node node_modules/@uuv/playwright/bin/uuv"
    },
  ...
}
```

</TabItem>
</Tabs>

## Cannot run tests with jetbrains-plugin

### Case 1 : Open or Run command is null
Target script attribute is automatically deleted sometimes. you must fill the field **Target Script attribute** of UUV run/debug configuration with open or e2e ([bug traced](https://github.com/Orange-OpenSource/uuv/issues/305 "Opening in new tab bug 305 of Orange OpenSource/uuv")).

#### Message

![open or e2e command is null](@site/static/img/docs/jetbrain-plugin/error/error_command_open_or_e2e.png)

#### Solution

![target script of UUV configuration](@site/static/img/docs/jetbrain-plugin/error/solution_open_e2e_command.png)

### Case 2 : npm command is not found or npx command is not found
On MacOs, environment variable named PATH cannot be read from plugin.

#### Message

![npm command is not found message](@site/static/img/docs/jetbrain-plugin/error/error_path_inaccessible_npm.png)

or 

![npx command is not found message](@site/static/img/docs/jetbrain-plugin/error/error_path_inaccessible_npx.png)

#### Solution

From UUV run/debug configuration, set the `Path` environment variable in the **Environment variables** field (click ![Environment variables icon](https://resources.jetbrains.com/help/img/idea/2023.1/app.general.inlineVariables.svg)).

You can :
- either set the value manually :
  ![target script of UUV configuration](@site/static/img/docs/jetbrain-plugin/error/solution_path_inaccessible.png)
- Or copy the value from the system variable (follow steps 1 to 4 on the following image) :
  ![target script of UUV configuration](@site/static/img/docs/jetbrain-plugin/error/solution_env_variable.png)
