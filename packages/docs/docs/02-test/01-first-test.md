# Your first test

:::caution
**For autocompletion from IntelliJ**, download the [cucumber.js](https://plugins.jetbrains.com/plugin/7418-cucumber-js) plugin.
:::

## Writing test
To write your first test, create the file `uuv/e2e/first-test.feature` in the project root with the following content :
```gherkin
Feature: Hello World

  Scenario: Search - Successful case
    When I visit path "/"
    Then I should see an element with role "heading" and name "My app title"
```
You can find test examples here : [google.feature](https://github.com/e2e-test-quest/uuv/example/google.fr.feature)

