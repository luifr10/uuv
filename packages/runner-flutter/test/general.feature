Feature: General

  Scenario: Find app title
    Given the app is running
    Then I should see a title named {'Todo List'}

  Scenario: Find existing button
    Given the app is running
    And I should see a button named {'Add new element'}

  Scenario: Don't find Non-existent button
    Given the app is running
    And I should not see a button named {'Non-existent Button'}

  Scenario: Find existing text field
    Given the app is running
    And I should see a text field named {'New task name'}