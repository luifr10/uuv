import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Reusable scenarios

:::caution
**Only available for developers**

Reusable scenarios cannot be used in conjunction with each other
:::

## Create file with extension .playbook.feature
File with this extension contains reusable scenarios.

```gherkin title='uuv/e2e/playbook/template.playbook.feature'
@Ignore //Only used with playwright
Feature: Template

  Scenario: I go to town list
    When I visit path "https://e2e-test-quest.github.io/weather-app/"
    And Within a button named "Get started"
    And I click

  Scenario: I select douala
    When I visit path "https://e2e-test-quest.github.io/weather-app/"
    And Within a button named "Get started"
    And I click
    And I reset context
    And Within a list named "Available Towns"
    And Within a list item named "Douala"
    And I click
    And I reset context
```

## Create a file with extension .playbooked.feature
Files with this extension contains scenarios using reusable scenarios.

```gherkin title='uuv/e2e/playbook/weatherApp.playbooked.feature'
@Ignore //Only used with playwright
Feature: Feature using reusable scenarios

  Scenario: vital check on first page
    Given I go to town list
    Then I should see a title named "Nothing to display" 

  Scenario: vital check on second page
    Given I select douala
    Then Within the element with aria-label "Weather of Douala"
    And I should see a title named "Douala"
    And I should see an element with content "min: 10.8 °c"
```

## Launch script to generate executable feature
this script replace playbook scenarios name by playbook scenarios steps.

<Tabs>
<TabItem value="Npm" label="Npm">

```shell
npx uuv playbook
```

</TabItem>
<TabItem value="Yarn" label="Yarn">

```shell
yarn uuv playbook
```

</TabItem>
</Tabs>
