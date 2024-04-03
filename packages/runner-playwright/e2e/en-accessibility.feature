Feature: Accessibility Step Definition

  Rule: a11y
    Scenario: key.then.a11y.check.default
      When I visit path "https://e2e-test-quest.github.io/simple-webapp/"
      Then I should not have any axe-core accessibility issue

    Scenario: key.then.a11y.check.onlyCritical
      When I visit path "https://e2e-test-quest.github.io/weather-app/"
      When within a button named "Get started"
      And I click
      And I reset context
      Then I should not have any axe-core critical accessibility issue

    Scenario: key.then.a11y.check.withFixtureOption
      When I visit path "https://e2e-test-quest.github.io/weather-app/"
      And within a button named "Get started"
      And I click
      And I reset context
      Then I should not have any axe-core accessibility issue with option json fixture withExperimentalOption.json

    Scenario: key.then.a11y.check.withImpacts
      When I visit path "https://e2e-test-quest.github.io/weather-app/"
      And within a button named "Get started"
      And I click
      And I reset context
      Then I should not have any axe-core accessibility issue with critical impact

    Scenario: key.then.a11y.check.withFixtureContextAndFixtureOption
      When I visit path "https://e2e-test-quest.github.io/weather-app/"
      And within a button named "Get started"
      And I click
      And I reset context
      Then I should not have any axe-core accessibility issue with context json fixture withExcludeErrorContext.json and option json fixture withBestPracticeOption.json

  Scenario: key.then.a11y.check.withTags
    When I visit path "https://e2e-test-quest.github.io/weather-app/"
    And within a button named "Get started"
    And I click
    And I reset context
    Then I should not have any axe-core accessibility issue with accessibility standards wcag2a

  Rule: accessibility keys
    Scenario: key.then.keyboard.press - Left right
      When I visit path "https://e2e-test-quest.github.io/weather-app/"
      And within a button named "Get started"
      And I click
      And I reset context
      And within a text box named "Search for a town"
      And I type the sentence "mo"
      And I press 2 times on "{left}"
      And I type the sentence "Li"
      And I press 2 times on "{right}"
      And I type the sentence "ges"
      And I reset context
      Then I should see a text box named "Search for a town" and containing "Limoges"

    Scenario: key.then.keyboard.press - Up Down
      When I visit path "https://e2e-test-quest.github.io/weather-app/"
      And within a button named "Get started"
      And I click
      And I reset context
      And within a text box named "Search for a town"
      And I type the sentence "mo"
      And I press "{up}"
      And I type the sentence "Li"
      And I press "{down}"
      And I type the sentence "ges"
      And I reset context
      Then I should see a text box named "Search for a town" and containing "Limoges"

    Scenario: key.when.keyboard.nextElement
      When I visit path "https://e2e-test-quest.github.io/weather-app/"
      And I go to next keyboard element
      And I click

