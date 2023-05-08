Feature: Assistant vital features

  Scenario: All elements are displayed by default
    When I visit path "/uuv"
    Then I should see a picture named "UUV logo"
    Then I should see a picture named "Light mode"
    Then I should see a button named "Select"
    Then I should see a button named "Copy" and containing "Copy" disabled
    Then I should see a button named "uvv Assistant expanded"
    Then I should see an element with testId "selectListExpanded"

  Scenario: Select with expected action
    When I visit path "/uuv"
    Then Within a button named "select button"
    Then I click
    Then I reset context
    Then Within a text box named "Last name"
    Then I click
    Then I reset context
    Then I should see an element with content "Then I should see a text box named \"Last name\" and containing \"Doe\""
    Then I should see a button named "Copy" and containing "Copy"

  Scenario: Select with selector warning
    When I visit path "/uuv"
    Then Within a button named "select button"
    Then I click
    Then I reset context
    Then Within the element with testId "sentence"
    Then I click
    Then I reset context
    Then I should see an element with content "Then I should see an element with selector \"p[data-testid=sentence]\""
    Then I should see a picture named "logo warning"

  Scenario: Expander down
    When I visit path "/uuv"
    Then Within the element with testId "expanderButton"
    Then I click
    Then I reset context
    Then I should see a picture named "UUV logo"
    Then I should see a picture named "Light mode"
    Then I should see a button named "floating select button"
    Then I should see a button named "floating copy button" and containing "Copy" disabled
    Then I should see an element with testId "floatingSelectList"


#  Scenario: Change theme
#    When I visit path "/uuv"
#    Then Within a picture named "Light mode"
#    Then I click
#    Then I reset context
#    Then Within a button named "select button"
#    Then I should see these attributes with values
#    |||

#  Scenario: Select with within action
#    When I visit path "/uuv"
#    Then Within the element with testId "selectListExpanded"
#    Then I click
#    Then I reset context
#    Then Within the element with selector "#rc_select_2_list_1"
#    Then I click
#    Then I reset context
#    Then Within a button named "select button"
#    Then I click
#    Then I reset context
#    Then Within a text box named "Last name"
#    Then I click
#    Then I reset context
#    Then I should see an element with content "When Within a text box named \"Last name\""

