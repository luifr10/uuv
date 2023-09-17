import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Configuration

## Mise à jour du .gitignore

Modifier le fichier `.gitignore` pour rajouter les lignes suivantes :

```gitignore title='.gitignore'
#@uuv
/uuv/reports
/uuv/.uuv-features-gen
```

## IDE Plugins
### IntelliJ
- Télécharger le plugin [cucumber.js](https://plugins.jetbrains.com/plugin/7418-cucumber-js) **pour l'autocompletion** lors de l'écriture de vos tests.
- Installer [le plugin Jetbrain UUV](/docs/tools/uuv-jetbrain-plugin) **pour exécuter les tests depuis l'ide**

### VS Code
**Pour l'autocompletion** lors de l'écriture de vos tests, télécharger le plugin [Cucumber (Gherkin) Full Support](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete).<br/>Puis, créer ou modifier le fichier `.vscode/settings.json` afin d'ajouter les lignes suivantes :
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