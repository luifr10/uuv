import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Running tests

## Opening runner

<Tabs>
<TabItem value="cypress" label="Cypress">

:::tip
Modify the url, change the `e2e.baseUrl` parameter in the `uuv/cypress.config.ts` file in order to fill the
target url.
:::

</TabItem>
<TabItem value="playwright" label="Playwright">

:::tip
[WIP] Modify the url, change the `e2e.baseUrl` parameter in the `uuv/cypress.config.ts` file in order to fill the
    target url.
:::

</TabItem>
</Tabs>

From powershell or cmd terminal **in non-administrator mode** :

<Tabs>
<TabItem value="Npm" label="Npm">

```shell
npm run uuv open
```

</TabItem>
<TabItem value="Yarn" label="Yarn">

```shell
yarn uuv open
```

</TabItem>
</Tabs>

## Exécution des tests E2E depuis la console

From powershell or cmd terminal **in non-administrator mode** :


<Tabs>
<TabItem value="Npm" label="Npm">

```shell
npm run uuv e2e
```

With arguments

```shell
npm run uuv e2e -- --browser=edge --env="{'TAGS':'@mobile'}" --generateHtmlReport
```

</TabItem>
<TabItem value="Yarn" label="Yarn">

```shell
yarn uuv e2e
```

With arguments

```shell
yarn uuv e2e -- --browser=edge --env="{'TAGS':'@mobile'}" --generateHtmlReport
```

</TabItem>
</Tabs>

<Tabs>
<TabItem value="cypress" label="Cypress">

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

#### Arguments

| Nom     | Description                                                                                                   | Valeur                                                                                                                                                                                                                                                                                 |
|---------|---------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `browser` | Target browser                                                                                                | `chrome` / `edge` / `firefox` / `electron`                                                                                                                                                                                                                                             |
| `env` | Environment variables                                                                                         | Json object containing the properties: <br/> - `TAGS` : To target the [cucumber tags](https://cucumber.io/docs/cucumber/api/?lang=javascript#tags) <br/> - `...` : All [possible properties](https://docs.cypress.io/guides/references/configuration#Global) for cypress |
| `generateHtmlReport` | When this option is present, an html report of the executed tests will be generated here : `./reports/e2e/html/` | N/A                                                                                                                                                                                                                                                                                    |

</TabItem>
<TabItem value="playwright" label="Playwright">

WIP

</TabItem>
</Tabs>

