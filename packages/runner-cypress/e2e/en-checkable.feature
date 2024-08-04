Feature: Checkable components

    Background:
        Given I visit path "https://e2e-test-quest.github.io/weather-app/?isStarted=true"
        And I click on button named "Add new town"

    Scenario: Radio button
        Then I should see a radio named "Small (under 150000)" checked
        And I should see a radio named "Medium (150000 to 1 million)" unchecked

    Scenario: Radio button and click
        When I click on element with role "radio" and name "Medium (150000 to 1 million)"
        Then I should see a radio named "Medium (150000 to 1 million)" checked
        Then I should see a radio named "Small (under 150000)" unchecked

    Scenario: Checkbox
        Then I should see a checkbox named "Allow automatic update" unchecked

    Scenario: Checkbox and click
        When I click on element with role "checkbox" and name "Allow automatic update"
        Then I should see a checkbox named "Allow automatic update" checked
