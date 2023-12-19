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

## IDE Plugins
### IntelliJ 
  - Download the [cucumber.js](https://plugins.jetbrains.com/plugin/7418-cucumber-js) plugin **for autocompletion** while writing your tests.
  - Install [UUV Jetbrains Plugin](/docs/tools/uuv-jetbrains-plugin) **for test execution inside ide**

### VS Code 
**For autocompletion** while writing your tests, download the [Cucumber](https://marketplace.visualstudio.com/items?itemName=CucumberOpen.cucumber-official) plugin.<br/>Then, create or edit the `.vscode/settings.json` file to add the following lines :
  ```json title='.vscode/settings.json'
  {
      "cucumber.features": [
        "uuv/e2e/**/*.feature"
      ],
      "cucumber.glue": [
        "uuv/cucumber/step_definitions/**/*.{js,ts}",
        "node_modules/@uuv/*/src/cucumber/step_definitions/*/unsafe/**/*.ts",
        "node_modules/@uuv/*/src/cucumber/step_definitions/*/generated/**/*.ts",
        "node_modules/@uuv/*/src/cucumber/step_definitions/*/generated/enriched/*/*.ts"
      ]
  }
  ```
