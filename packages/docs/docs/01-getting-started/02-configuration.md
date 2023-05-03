import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Configuration

## Update of the .gitignore

Edit the `.gitignore` file to add the following lines :

```gitignore title='.gitignore'
#@uuv
/uuv/reports
/uuv/.uuv-features-gen
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

