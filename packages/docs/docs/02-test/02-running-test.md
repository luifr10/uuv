import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Running tests

## Opening runner

<Tabs>
<TabItem value="cypress" label="Cypress">

:::tip
To modify the url, change the `e2e.baseUrl` parameter in the `uuv/cypress.config.ts` file in order to fill the target url.
:::

</TabItem>
<TabItem value="playwright" label="Playwright">

:::tip
To modify the url, change the `use.baseURL` parameter in the `uuv/playwright.config.ts` file in order to fill the target url.
:::

</TabItem>
</Tabs>

From powershell or cmd terminal :

<Tabs>
<TabItem value="Npm" label="Npm">

```shell
npx uuv open
```

</TabItem>
<TabItem value="Yarn" label="Yarn">

```shell
yarn uuv open
```

</TabItem>
</Tabs>

## Running E2E tests from console
Use for continuous integration([CI example](https://github.com/e2e-test-quest/kata-e2e-uuv/blob/main/.github/workflows/ci.yml)) or headless execution.

From powershell or cmd terminal :


<Tabs>
<TabItem value="Npm" label="Npm">

```shell
npx uuv e2e
```

With arguments

```shell
npx uuv e2e --browser=edge --env="{'TAGS':'@mobile'}" --generateHtmlReport --targetTestFile=./uuv/e2e/first-test.feature
```

</TabItem>
<TabItem value="Yarn" label="Yarn">

```shell
yarn uuv e2e
```

With arguments

```shell
yarn uuv e2e --browser=edge --env="{'TAGS':'@mobile'}" --generateHtmlReport --targetTestFile=./uuv/e2e/first-test.feature
```

</TabItem>
</Tabs>

### Arguments

:::tip
To modify the BASE_URL in E2E mode, simply set the environment variable :

<Tabs>
<TabItem value="Windows" label="Windows">

```shell
set UUV_BASE_URL=http://localhost:4200
```

</TabItem>
<TabItem value="Shell" label="Shell">

```shell
export UUV_BASE_URL=http://localhost:4200
```

</TabItem>
</Tabs>
:::

<Tabs>
<TabItem value="Windows" label="Cypress">

| Nom                   | Description                                                                                                                                                                                                      | Valeur                                                                                                                                                                                                                                                                   |
|-----------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `browser`             | Target browser                                                                                                                                                                                                   | `chrome` / `edge` / `firefox` / `electron`                                                                                                                                                                                                                               |
| `env`                 | Environment variables                                                                                                                                                                                            | Json object containing the properties: <br/> - `TAGS` : To target the [cucumber tags](https://cucumber.io/docs/cucumber/api/?lang=javascript#tags) <br/> - `...` : All [possible properties](https://docs.cypress.io/guides/references/configuration#Global) for cypress |
| `generateHtmlReport`  | When this option is present, an html report of the executed tests will be generated here : `./uuv/reports/e2e/html/`<br/> [An example of a report](https://e2e-test-quest.github.io/kata-e2e-uuv/06-go-further/) | N/A                                                                                                                                                                                                                                                                                    |
| `generateJunitReport` | When this option is present, an junit report of the executed tests will be generated here : `./uuv/reports/e2e/junit-report.xml`                                                                                 | N/A                                                                                                                                                                                                                                                                                    |
| `generateA11yReport`  | When this option is present, a json report for a11y checks performed : `./uuv/reports/a11y-report.json`                                                                                                          | N/A                                                                                                                                                                                                                                                                                    |
| `targetTestFile`      | Specify test files to execute                                                                                                                                                                                    | **If not present**: all test files will be included<br/>**If set**: contains a `specPattern` path relative to the ProjetDir parameter                                                                                                                                    |

</TabItem>
<TabItem value="playwright" label="Playwright">

| Nom                 | Description                                                                                                                                                                                                  | Valeur                                                                                                                                |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| `browser`        | Target browser (one of those defined in `uuv/playwright.config.ts` file)                                                                                                                                     | `firefox` / `chromium` / `Google Chrome` / `Microsoft Edge`                                                                                            |
| `env`                | Environment variables                                                                                                                                                                                        | Json object containing the properties: <br/> - `TAGS` : To target the [cucumber tags](https://cucumber.io/docs/cucumber/api/?lang=javascript#tags) <br/> |
| `generateHtmlReport` | When this option is present, an html report of the executed tests will be generated here : `./reports/e2e/html/`<br/> [An example of a report](https://e2e-test-quest.github.io/kata-e2e-uuv/06-go-further/) | N/A                                                                                                                                                                                                                                                                                    |
| `generateJunitReport` | When this option is present, an junit report of the executed tests will be generated here : `./uuv/reports/e2e/junit-report.xml`                                                                             | N/A                                                                                                                                                                                                                                                                                    |
| `targetTestFile`    | Specify test files to execute                                                                                                                                                                                | **If not present**: all test files will be included<br/>**If set**: contains a `specPattern` path relative to the ProjetDir parameter |

</TabItem>
</Tabs>

