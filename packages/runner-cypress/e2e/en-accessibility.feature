Feature: Accessibility Step Definition

  Scenario: key.then.a11y.check.default
    When I visit path "https://e2e-test-quest.github.io/simple-webapp/"
    Then I should not have any accessibility issue

  Scenario: key.then.a11y.check.withAllowFailure
    When I visit path "https://e2e-test-quest.github.io/weather-app/"
    And Within a button named "Get started"
    And I click
    And I reset context
    Then I could have accessibility issue

  Scenario: key.then.a11y.check.onlyCritical
    When I visit path "https://e2e-test-quest.github.io/weather-app/"
    When Within a button named "Get started"
    And I click
    And I reset context
    Then I should not have any critical accessibility issue

  Scenario: key.then.a11y.check.withFixtureOption
    When I visit path "https://e2e-test-quest.github.io/weather-app/"
    And Within a button named "Get started"
    And I click
    And I reset context
    Then I should not have any accessibility issue with option json fixture withExperimentalOption.json

  Scenario: key.then.a11y.check.withImpacts
    When I visit path "https://e2e-test-quest.github.io/weather-app/"
    And Within a button named "Get started"
    And I click
    And I reset context
    Then I should not have any accessibility issue with critical impact

  Scenario: key.then.a11y.check.withFixtureContextAndFixtureOption
    When I visit path "https://e2e-test-quest.github.io/weather-app/"
    And Within a button named "Get started"
    And I click
    And I reset context
    Then I should not have any accessibility issue with context json fixture withExcludeErrorContext.json and option json fixture withBestPracticeOption.json

  Scenario: key.then.a11y.check.withAllowFailureAndFixtureContextAndFixtureOption
    When I visit path "https://e2e-test-quest.github.io/weather-app/"
    And Within a button named "Get started"
    And I click
    And I reset context
    Then I could have accessibility issue with context json fixture withContext.json and option json fixture withBestPracticeOption.json

  Scenario: key.then.a11y.check.withTags
    When I visit path "https://e2e-test-quest.github.io/weather-app/"
    And Within a button named "Get started"
    And I click
    And I reset context
    Then I should not have any accessibility issue with accessibility standards wcag2a

