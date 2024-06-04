import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Exécution des tests

## Ouverture du Runner

<Tabs>
<TabItem value="cypress" label="Cypress">

:::tip
Pour modifier l'url, changer le paramètre `e2e.baseUrl` dans le fichier `uuv/cypress.config.ts` afin de renseigner l'url cible.
:::

</TabItem>
<TabItem value="playwright" label="Playwright">

:::tip
Pour modifier l'url, changer le paramètre `use.baseURL` dans le fichier `uuv/playwright.config.ts` afin de renseigner l'url cible.
:::

</TabItem>
</Tabs>

Depuis powershell ou un terminal cmd  :

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

## Exécution des tests E2E depuis la console
A utiliser pour l'intégration continue([exemple de CI](https://github.com/e2e-test-quest/kata-e2e-uuv/blob/main/.github/workflows/ci.yml)) ou toute exécution headless.

Depuis powershell ou un terminal cmd :


<Tabs>
<TabItem value="Npm" label="Npm">

```shell
npx uuv e2e
```

Avec des arguments

```shell
npx run uuv e2e --browser=edge --env="{'TAGS':'@mobile'}" --generateHtmlReport --targetTestFile=./uuv/e2e/first-test.feature
```

</TabItem>
<TabItem value="Yarn" label="Yarn">

```shell
yarn uuv e2e
```

Avec des arguments

```shell
yarn uuv e2e --browser=edge --env="{'TAGS':'@mobile'}" --generateHtmlReport --targetTestFile=./uuv/e2e/first-test.feature
```

</TabItem>
</Tabs>

### Arguments

:::tip
Pour modifier la BASE_URL en mode E2E, il suffit de positionner la variable d'environnement :

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
<TabItem value="cypress" label="Cypress">

| Nom                  | Description                                                                                                                                                                                               | Valeur                                                                                                                                                                                                                                                                               |
|----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `browser`            | Navigateur cible                                                                                                                                                                                          | `chrome` / `edge` / `firefox` / `electron`                                                                                                                                                                                                                                           |
| `env`                | Variable d'environnement                                                                                                                                                                                  | Objet json contenant les propriétés: <br/> - `TAGS` : Pour cibler des [tags cucumber](https://cucumber.io/docs/cucumber/api/?lang=javascript#tags) <br/> - `...` : L'ensemble des [propriétés possible pour cypress](https://docs.cypress.io/guides/references/configuration#Global) |
| `generateHtmlReport` | Lorsque cette option est présente, un rapport html des tests éxécutés sera généré içi : `./uuv/reports/e2e/html/`<br/> [Exemple de rapport](https://e2e-test-quest.github.io/kata-e2e-uuv/06-go-further/) | N/A                                                                                                                                                                                                                                                                                  |
| `generateJunitReport` | Lorsque cette option est présente, un rapport junit des tests éxécutés sera généré içi : `./uuv/reports/e2e/junit-report.xml`                                                                             | N/A                                                                                                                                                                                                                                                                                  |
| `generateA11yReport` | Lorsque cette option est présente, un rapport json des tests d'accessibilité éxécutés sera généré içi : `./uuv/reports/a11y-report.json`                                                                  | N/A                                                                                                                                                                                                                                                                                    |
| `targetTestFile`     | Specifie les fichiers de test à exécuter                                                                                                                                                                  | **Si absent** : tous les fichiers de test seront inclus<br/>**Si défini** : contient un chemin `specPattern` relatif au paramètre ProjetDir                                                                                                                                          |

</TabItem>
<TabItem value="playwright" label="Playwright">

| Nom                 | Description                                                                                                                                                                                           | Valeur                                                                                                                                                   |
|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `browser`        | Navigateur cible (l'un de ceux définis dans le fichier `uuv/playwright.config.ts`)                                                                                                                    | `firefox` / `chromium` / `Google Chrome` / `Microsoft Edge`                                                                                                                                 |
| `env`                | Variable d'environnement                                                                                                                                                                              | Objet json contenant les propriétés: <br/> - `TAGS` : Pour cibler des [tags cucumber](https://cucumber.io/docs/cucumber/api/?lang=javascript#tags) <br/> |
| `generateHtmlReport` | Lorsque cette option est présente, un rapport html des tests éxécutés sera généré içi : `./reports/e2e/html/`<br/> [Exemple de rapport](https://e2e-test-quest.github.io/kata-e2e-uuv/06-go-further/) | N/A                                                                                                                                                      |
| `generateJunitReport` | Lorsque cette option est présente, un rapport junit des tests éxécutés sera généré içi : `./uuv/reports/e2e/junit-report.xml`                                                                         | N/A                                                                                                                                                                                                                                                                                  |
| `targetTestFile`    | Specifie les fichiers de test à exécuter                                                                                                                                                              | **Si absent** : tous les fichiers de test seront inclus<br/>**Si défini** : contient un chemin `specPattern` relatif au paramètre ProjetDir              |


</TabItem>
</Tabs>
