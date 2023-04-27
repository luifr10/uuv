import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Configuration

## Add npm script
Edit the `package.json` file to add the following line in the script section :

```json title='package.json'
{
...
    "scripts": {
        "...
        "uuv": "uuv"
    },
  ...
}
```

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
        "uuv": "node node_modules/@uuv/cypress/dist/lib/uuv-cli.js"
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
        "uuv": "node node_modules/@uuv/playwright/dist/lib/uuv-cli.js"
    },
  ...
}
```

</TabItem>
</Tabs>


## Update of the .gitignore

Edit the `.gitignore` file to add the following lines :

```gitignore title='.gitignore'
#@nobelisation/uuv
/uuv/reports
```


## (Optionnel) Add Typescript types
<Tabs>
<TabItem value="cypress" label="Cypress">

:::warning
This step is only necessary if you plan to add your own [step_definitions](/docs/wordings/add-custom-step-definition).
:::
Add a new file `tsconfig.e2e.json` to include the necessary types :

```json title='tsconfig.e2e.json'
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": [
      "cypress",
      "@testing-library/cypress",
      "@nobelisation/uuv"
    ]
  },
  "files": [
    "uuv/cypress.config.ts"
  ],
  "include": [
    "src/**/*.cy.ts"
  ]
}
```

</TabItem>
<TabItem value="playwright" label="Playwright">

WIP

</TabItem>
</Tabs>

