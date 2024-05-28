Feature: UUV Assistant vital features

  Scenario: Bar should be displayed
    When I visit path "/"
    Then I should see a picture named "UUV logo"
    And I should see a menuitem named "Mouse actions"
    And I should see a menuitem named "Keyboard actions"
    And I should see a button named "Open result view"
    And I should not see a title named "Result of No action"

  Scenario: Available mouse actions
    Given I visit path "/"
    When I click on element with role "menuitem" and name "Mouse actions"
    Then I should see a menuitem named "Expect"
    And I should see a menuitem named "Click"
    And I should see a menuitem named "Within"

  Scenario: Available keyboard actions
    Given I visit path "/"
    When I click on element with role "menuitem" and name "Keyboard actions"
    And I should see a menuitem named "Keyboard navigation"

  Scenario: Opening result view without result
    Given I visit path "/"
    When I click on button named "Open result view"
    Then I should see a title named "Result of No action"
    And I should see a text box named "Generated UUV Script" and containing ""

  Scenario: Select with mouse expect action
    Given I visit path "/"
    When I click on element with role "menuitem" and name "Mouse actions"
    And I click on element with role "menuitem" and name "Expect"
    And I click on element with role "textbox" and name "Last name"
    Then I should see a title named "Result of Expect"
    And I should see a text box named "Generated UUV Script" and containing "Feature: Your amazing feature name Scenario: Action - Expect Given I visit path \"http://127.0.0.1:3200/\" Then I should see a text box named \"Last name\" and containing \"Doe\""

  Scenario: Select with mouse click action
    Given I visit path "/"
    When I click on element with role "menuitem" and name "Mouse actions"
    And I click on element with role "menuitem" and name "Click"
    And I click on button named "Reset"
    Then I should see a title named "Result of Click"
    And I should see a text box named "Generated UUV Script" and containing "Feature: Your amazing feature name Scenario: Action - Click Given I visit path \"http://127.0.0.1:3200/\" When I click on button named \"Reset\""

  Scenario: Select with mouse within action
    Given I visit path "/"
    When I click on element with role "menuitem" and name "Mouse actions"
    And I click on element with role "menuitem" and name "Within"
    And I click on element with role "group" and name "flegend"
    Then I should see a title named "Result of Within"
    And I should see a text box named "Generated UUV Script" and containing "Feature: Your amazing feature name Scenario: Action - Within Given I visit path \"http://127.0.0.1:3200/\" When within a group named \"flegend\""

  Scenario: Select with keyboard navigation action
    Given I visit path "/"
    When I click on element with role "menuitem" and name "Keyboard actions"
    And I click on element with role "menuitem" and name "Keyboard navigation"
    Then I should see a title named "Result of Keyboard Navigation"
    And I should see a text box named "Generated UUV Script" and containing "Feature: Your amazing feature name Scenario: Keyboard Navigation Given I visit path \"http://127.0.0.1:3200/\" And I start a keyboard navigation from the top of the page Then I should see a text box named \"Last name\" keyboard focused And I go to next keyboard element And I should see a button named \"Submit\" keyboard focused And I go to next keyboard element And I should see a button named \"Reset\" keyboard focused And I go to next keyboard element And I should see a button named \"Submit\" keyboard focused"
#    And I should see a radio named "Current"
#    And I should see a radio named "Expected"

