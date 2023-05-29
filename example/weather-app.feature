Feature: Google search example

  Background:
    Given I visit path "https://e2e-test-quest.github.io/weather-app/"

  Scenario: Homepage
    # Verify elements on landing page
    Then I should see a title named "Weather App"
    And I should see a button named "Get started"

  Scenario: Weather - "Nothing to display" must be displayed
    # Click on <Get started> button
    When Within a button named "Get started"
    And I click
    And I reset context
    # Check that there's nothing to display because there is no town selected.
    Then I should see a title named "Nothing to display"

  Scenario: Weather - Town List must be ok
    # Click on <Get started> button
    When Within a button named "Get started"
    And I click
    And I reset context
    # Checks the list of available towns.
    Then I should see elements of the list with name "Available Towns"
      | Douala  |
      | Tunis   |
      | Limoges |

  Scenario: TownSelection - Douala
    # Click on <Get started> button
    When Within a button named "Get started"
    And I click
    And I reset context
    # Select Douala town
    And Within a list named "Available Towns"
    And Within a list item named "Douala"
    And I click
    And I reset context
    # Check the weather details for Douala town
    Then Within the element with aria-label "Weather of Douala"
    And I should see a title named "Douala"
    And I should see an element with content "min: 10.8 °c"

  Scenario: TownResearch
    # Click on <Get started> button
    When Within a button named "Get started"
    And I click
    And I reset context
    # Type sentence "i" on input field
    And Within an text box named "Search for a town"
    And I type the sentence "i"
    And I reset context
    # Click on <Filter> button
    And Within a button named "Filter"
    And I click
    And I reset context
    # Checks the list of available towns.
    Then I should see elements of the list with name "Available Towns"
      | Tunis   |
      | Limoges |