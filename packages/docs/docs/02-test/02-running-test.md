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

<Tabs>
<TabItem value="Windows" label="Cypress">

:::tip
To modify the BASE_URL in E2E mode, simply set the environment variable :

<Tabs>
<TabItem value="Windows" label="Windows">

```shell
set CYPRESS_BASE_URL=http://localhost:4200
```

</TabItem>
<TabItem value="Shell" label="Shell">

```shell
export CYPRESS_BASE_URL=http://localhost:4200
```

</TabItem>
</Tabs>
:::

| Nom                  | Description                                                                                                      | Valeur                                                                                                                                                                                                                                                                   |
|----------------------|------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `browser`            | Target browser                                                                                                   | `chrome` / `edge` / `firefox` / `electron`                                                                                                                                                                                                                               |
| `env`                | Environment variables                                                                                            | Json object containing the properties: <br/> - `TAGS` : To target the [cucumber tags](https://cucumber.io/docs/cucumber/api/?lang=javascript#tags) <br/> - `...` : All [possible properties](https://docs.cypress.io/guides/references/configuration#Global) for cypress |
| `generateHtmlReport` | When this option is present, an html report of the executed tests will be generated here : `./reports/e2e/html/` | N/A                                                                                                                                                                                                                                                                      |
| `targetTestFile`     | Specify test files to execute                                                                                    | **If not present**: all test files will be included<br/>**If set**: contains a `specPattern` path relative to the ProjetDir parameter                                                                                                                                    |

</TabItem>
<TabItem value="playwright" label="Playwright">

:::tip
To modify the BASE_URL in E2E mode, simply set the environment variable :

WIP
:::

| Nom                  | Description                                                                                                      | Valeur                                                                                                                                |
|----------------------|------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| `browser` WIP        | Target browser                                                                                                   | `chrome` / `edge` / `firefox` / `electron`                                                                                            |
| `generateHtmlReport` | When this option is present, an html report of the executed tests will be generated here : `./reports/e2e/html/` | N/A                                                                                                                                   |
| `targetTestFile`     | Specify test files to execute                                                                                    | **If not present**: all test files will be included<br/>**If set**: contains a `specPattern` path relative to the ProjetDir parameter |

</TabItem>
</Tabs>

