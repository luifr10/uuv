Feature: Ko

  Background:
    Given I visit path "https://e2e-test-quest.github.io/weather-app/"

  Scenario: Homepage - Bad title
    # Verify elements on landing page
    Then I should see a title named "Welcome to Weather App - ko"
    And I should see a button named "Get started"

  Scenario: Weather - Town List must be ok
    # Click on <Get started> button
    When I click on button named "Get started"
    # Checks the list of available towns.
    Then I should see a list named "Available Towns" and containing
      | Douala  |
      | Tunis   |
      | Limoges |

  Scenario: TownResearch - Bad textbox name
    # Click on <Get started> button
    When I click on button named "Get started"
    # Type sentence "i" on input field
    And I type the sentence "i" in the text box named "Search for a town3"
    # Click on <Filter> button
    And I click on button named "Filter"
    # Checks the list of available towns.
    Then I should see a list named "Available Towns" and containing
      | Tunis   |
      | Limoges |
