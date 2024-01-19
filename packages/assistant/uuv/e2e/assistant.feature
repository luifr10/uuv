Feature: Assistant vital features

  Scenario: All elements are displayed by default
    When I visit path "/test"
    Then I should not see a picture named "UUV logo"
    And I should not see a picture named "Light mode"
    And I should see a button named "Select an html element"
    And I should see a button named "Copy the resulting uuv sentence" and containing "Copy" disabled
    And I should see a button named "Click to expand UUV Assistant panel"
    And I should see a combo box named "Selected action"

  Scenario: Elements when expanded mode
    Given I visit path "/test"
    When I click on button named "Click to expand UUV Assistant panel"
    Then I should see a picture named "UUV logo"
    And I should see a picture named "Light mode"
    And I should see a button named "Select an html element"
    And I should see a button named "Copy the resulting uuv sentence" and containing "Copy" disabled
    And I should see a button named "Click to reduce UUV Assistant panel"
    And I should see a combo box named "Selected action"

  Scenario: Select with expected action
    Given I visit path "/test"
    When I click on button named "Select an html element"
    And I click on element with role "textbox" and name "Last name"
    Then I should see an element with content "Then I should see a text box named \"Last name\" and containing \"Doe\""
    And I should see a button named "Copy the resulting uuv sentence" and containing "Copy" enabled

  Scenario: Select with selector warning
    Given I visit path "/test"
    When I click on button named "Select an html element"
    And within the element with testId "sentence"
    And I click
    And I reset context
    Then I should see an element with content "Then I should see an element with selector \"p[data-testid=sentence]\""
    And I should see a picture named "Warning : The generated sentence is not user-centric"

#  Scenario: Change theme
#    When I visit path "/uuv"
#    Then within a picture named "Light mode"
#    Then I click
#    Then I reset context
#    Then within a button named "select button"
#    Then I should see these attributes with values
#    |||

#  Scenario: Select with within action
#    When I visit path "/uuv"
#    Then within the element with testId "selectListExpanded"
#    Then I click
#    Then I reset context
#    Then within the element with selector "#rc_select_2_list_1"
#    Then I click
#    Then I reset context
#    Then within a button named "select button"
#    Then I click
#    Then I reset context
#    Then within a text box named "Last name"
#    Then I click
#    Then I reset context
#    Then I should see an element with content "When within a text box named \"Last name\""

