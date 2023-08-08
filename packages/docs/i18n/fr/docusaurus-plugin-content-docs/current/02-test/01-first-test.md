# Mon premier test

:::caution
**Pour l'autocompletion** lors de l'écriture de vos tests, lire cette [section](/docs/getting-started/configuration#autocompl%C3%A9tion)
:::

## Ecriture du test
Pour écrire votre premier test, créer à la racine du projet le fichier `uuv/e2e/first-test.feature` avec le contenu suivant :
```gherkin title='uuv/e2e/first-test.feature'
Feature: Hello World

  Scenario: Search - Successful case
    When I visit path "/"
    Then I should see an element with role "heading" and name "My app title"
```
Vous pouvez trouver d'autres exemples de test ici : [weather-app.feature](https://github.com/Orange-OpenSource/uuv/blob/main/example/weather-app.feature)

