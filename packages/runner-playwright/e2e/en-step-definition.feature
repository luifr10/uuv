@Playwright
Feature: English Test Step Definition
  Background:
    When I visit path "https://e2e-test-quest.github.io/simple-webapp/"

  Scenario: key.then.element.withAriaLabel
    Then I should see an element with aria-label "flegend"

  Scenario: key.then.element.not.withAriaLabel
    Then I should not see an element with aria-label "NOT flegend"

  Scenario: key.then.element.withAriaLabelAndContent
    Then I should see an element with aria-label "flegend" and content "Personalia"

  Scenario: key.then.element.withContent
    Then I should see an element with content "The fieldset element is used to group related data in a form, and the legend element defines a caption for the"

  Scenario: key.then.element.not.withContent
    Then I should not see an element with content "[NOT] The fieldset element is used to group related data in a form, and the legend element defines a caption for the"

  Scenario: key.then.element.withTestId
    Then I should see an element with testId "fieldset"

  Scenario: key.then.element.not.withTestId
    Then I should not see an element with testId "NOT fieldset"

  Scenario: key.then.element.withRoleAndName
    Then I should see an element with role "heading" and name "Grouping Form Data with Fieldset"

  Scenario: key.then.element.not.withRoleAndName
    Then I should not see an element with role "heading" and name "[NOT] Grouping Form Data with Fieldset"
    Then I should not see an element with role "NOTheading" and name "Grouping Form Data with Fieldset"

  Scenario: key.then.element.withRoleAndNameAndContent
    Then I should see an element with role "button" and name "Reset" and content "Reset"

  Scenario: key.then.element.withRoleAndNameAndContentDisabled
    Then I should see an element with role "textbox" and name "First name" and content "John" disabled

  Scenario: key.then.element.withRoleAndNameAndContentEnabled
    Then I should see an element with role "textbox" and name "Last name" and content "Doe" not disabled

  Scenario: key.then.list.withNameAndContent
    Then I should see elements of the list with name "test-list"
      | a |
      | b |
      | c |

  Scenario: key.then.attributes.withValues
    When Within the element with role "textbox" and name "First name"
    And I should see these attributes with values
      | class | fname-class |

  Scenario: key.then.element.key.when.click
    And Within the element with testId "fieldset"
    And Within the element with role "button" and name "Submit"
    When I click
     And I reset context
    Then I should see a title named "404"

  Scenario: key.then.element.key.when.type
    And Within the element with testId "fieldset"
    And Within the element with role "textbox" and name "Last name"
    When I type the sentence "Toto"
     And I reset context
    Then I should see an element with role "textbox" and name "Last name" and content "Toto"

  Scenario: key.given.within.selector
    Then Within the element with selector '[data-testid="fieldset"]'
    And Within the element with selector '#fname'
    And I should see these attributes with values
    | class | fname-class |
    And I reset context
