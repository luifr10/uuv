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
  - Install [UUV Jetbrain Plugin](/docs/tools/uuv-jetbrain-plugin) **for test execution inside ide**

### VS Code 
**For autocompletion** while writing your tests, download the [Cucumber (Gherkin) Full Support](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete) plugin.<br/>Then, create or edit the `.vscode/settings.json` file to add the following lines :
  ```json title='.vscode/settings.json'
  {
      "cucumberautocomplete.steps": [
         "uuv/cucumber/step_definitions/**/*.{js,ts}",
         "node_modules/@uuv/*/src/cucumber/step_definitions/*/unsafe/**/*.ts",
         "node_modules/@uuv/*/src/cucumber/step_definitions/*/generated/**/*.ts",
         "node_modules/@uuv/*/src/cucumber/step_definitions/*/generated/enriched/*/*.ts"
      ],
      "cucumberautocomplete.strictGherkinCompletion": true
  }
  ```
