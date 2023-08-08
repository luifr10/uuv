# Your first test

:::caution
**For autocompletion** while writing your tests, read this [section](/docs/getting-started/configuration#autocompletion)
:::

## Writing test
To write your first test, create the file `uuv/e2e/first-test.feature` in the project root with the following content :
```gherkin title='uuv/e2e/first-test.feature'
Feature: Hello World

  Scenario: Search - Successful case
    When I visit path "/"
    Then I should see an element with role "heading" and name "My app title"
```
You can find test examples here : [weather-app.feature](https://github.com/Orange-OpenSource/uuv/blob/main/example/weather-app.feature)

