Feature: First test

  Scenario: simple-app-tests - ok
    Then I should see the following text "Hello Android!"
    Then I should see a button with description "Toogle Display Description"
    And I should see a button with description "Toogle Display Description" and containing "Toogle Display"

  Scenario: simple-app-tests - click with desc - ok
    Given I should not see the following text "ConditionalComponent is showed"
    And I click on a button with description "Toogle Display Description"
    Then I should see the following text "ConditionalComponent is showed"

  Scenario: simple-app-tests - click with desc and content - ok
    Given I reset app
    And I should not see the following text "ConditionalComponent is showed"
    And I click on a button with description "Toogle Display Description" and containing "Toogle Display"
    Then I should see the following text "ConditionalComponent is showed"