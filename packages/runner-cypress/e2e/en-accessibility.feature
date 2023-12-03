Feature: Accessibility Step Definition

  Rule: a11y
    Scenario: key.then.a11y.check.default
      When I visit path "https://e2e-test-quest.github.io/simple-webapp/"
      Then I should not have any accessibility issue

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

  Scenario: key.then.a11y.check.withTags
    When I visit path "https://e2e-test-quest.github.io/weather-app/"
    And Within a button named "Get started"
    And I click
    And I reset context
    Then I should not have any accessibility issue with accessibility standards wcag2a

  Rule: accessibility keys
    Scenario: key.then.keyboard.press - Reverse Tab & Tab
      When I visit path "https://e2e-test-quest.github.io/weather-app/"
      And Within an button named "Get started"
      And I press "{reverseTab}"
      And I press "{tab}"
      And I click

    Scenario: key.then.keyboard.multiplePress - Reverse Tab & Tab
      When I visit path "https://e2e-test-quest.github.io/weather-app/"
      And I click on button named "Get started"
      And I type the sentence "i" in the text box named "Search for a town"
      And Within a link named "Home"
      And I press 2 times on "{tab}"
      And I click
      And I reset context
      Then I should see elements of the list with name "Available Towns"
        | Tunis   |
        | Limoges |

    Scenario: key.then.keyboard.press - Left right
      When I visit path "https://e2e-test-quest.github.io/weather-app/"
      And Within an button named "Get started"
      And I click
      And I reset context
      And Within an text box named "Search for a town"
      And I type the sentence "mo"
      And I press 2 times on "{left}"
      And I type the sentence "Li"
      And I press 2 times on "{right}"
      And I type the sentence "ges"
      And I reset context
      Then I should see an text box named "Search for a town" and containing "Limoges"

    Scenario: key.then.keyboard.press - Up Down
      When I visit path "https://e2e-test-quest.github.io/weather-app/"
      And Within an button named "Get started"
      And I click
      And I reset context
      And Within an text box named "Search for a town"
      And I type the sentence "mo"
      And I press "{up}"
      And I type the sentence "Li"
      And I press "{down}"
      And I type the sentence "ges"
      And I reset context
      Then I should see an text box named "Search for a town" and containing "Limoges"

