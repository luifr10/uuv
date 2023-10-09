@Ignore
Feature: Accessibility Step Definition

    Scenario: key.then.a11y.check.default
      Given je me connecte3
      Then I should not see an element with aria-label "[NOT] flegend"
