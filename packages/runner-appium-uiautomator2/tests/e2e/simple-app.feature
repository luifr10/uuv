Feature: First test

  Scenario: simple-app-tests - ok
    Then I should see an element with content "Hello Android!"
    And I should see a button with description "Toogle Display Description"
    And I should see a button with description "Toogle Display Description" and containing "Toogle Display"

  Scenario: simple-app-tests - click with desc - ok
    Given I should not see an element with content "ConditionalComponent is showed"
     And I tap on a button with description "Toogle Display Description"
    Then I should see an element with content "ConditionalComponent is showed"

  Scenario: simple-app-tests - click with desc and content - ok
    Given I reload app
    And I should not see an element with content "ConditionalComponent is showed"
    And I tap on a button with description "Toogle Display Description" and containing "Toogle Display"
    Then I should see an element with content "ConditionalComponent is showed"