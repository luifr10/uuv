Feature: Within and type
  Scenario: key.when.withinElement.withRoleBased and enter specific value
    Given I visit path "https://e2e-test-quest.github.io/weather-app/?isStarted=true"
    And I click on button named "Add new town"
    When within the element with selector "#new-town-name"
    And I type the sentence "why always me ?"
    And I reset context
    And I should see a text box named "Town name" and containing "why always me ?"
    And within a spin button named "Latitude"
    And I enter the value "15"
    And I reset context
    Then I should see a spin button named "Latitude" and containing "15"


  Scenario: key.when.withinElement.selector and enter specific value
    Given I visit path "https://e2e-test-quest.github.io/weather-app/?isStarted=true"
    And I click on button named "Add new town"
    When within the element with selector "#new-town-name"
    And I type the sentence "why always me ?"
    And I reset context
    And I should see a text box named "Town name" and containing "why always me ?"
    And within the element with selector "#new-town-latitude"
    And I enter the value "15"
    And I reset context
    Then I should see a spin button named "Latitude" and containing "15"
