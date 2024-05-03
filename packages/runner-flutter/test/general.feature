Feature: General

  # Scenario: Put the device in landscape mode
  #   Given the app is running
  #   And I put the device in landscape mode
  #   Then I should see the text {'Orientation: Landscape Mode'}
  #   And I should not see the text {'Orientation: Portrait Mode'}

  Scenario: Put the device in portrait mode
    Given the app is running
    And I put the device in portrait mode
    Then I should see the text {'Orientation: Portrait Mode'}
    And I should not see the text {'Orientation: Landscape Mode'}

  Scenario: Find a text
    Given the app is running
    Then I should see the text {'Todo List'}

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