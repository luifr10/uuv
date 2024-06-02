# Migrations des 2.x.x mineurs ou patch

## Rationnalisation des phrases sur les listes
Pour `@uuv/cypress 2.6.0 -> 2.7.0` et `@uuv/playwright 2.5.0 -> 2.6.0`
- Les phrase suivantes ont été supprimées :
  - `je dois voir une liste nommée {string} et contenant {string} inactif`
  - `je dois voir une liste nommée {string} et contenant {string} actif`
- La phrase `je dois voir des elements de la liste ayant pour nom {string}` a été transformée en `Ije dois voir une liste nommée {string} et contenant`

## Mise à jour de la dépendance badeball-cypress-cucumber de v16 à v20
Pour `@uuv/cypress 2.18.0 -> 2.19.0`
- Déplacer le fichier`.cypress-cucumber-preprocessorrc.json` dans le dossier `uuv`

## Correction de bug sur le rapport html et suppression d'un paramètre obsolète
Pour `@uuv/cypress 2.21.0 -> 2.21.1`
- Modifier le contenu du fichier `uuv/.cypress-cucumber-preprocessorrc.json` :
  ```json
  {
    "stepDefinitions": [
      "cucumber/step_definitions/**/*.{js,ts}",
      "../node_modules/@uuv/cypress/dist/cucumber/step_definitions/cypress/{generated,unsafe}/**/*.{js,ts}"
    ],
    "messages": {
      "enabled": true
    },
    "json": {
      "enabled": true,
      "output": "reports/e2e/json/cucumber-report.json"
    }
  }
  ```
- Supprimer le paramètre `e2e.videoUploadOnPasses` dans le fichier `uuv/cypress.config.ts`
