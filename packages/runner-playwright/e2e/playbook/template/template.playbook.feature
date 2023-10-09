@Ignore
Feature: Template

    Scenario: je me connecte
      When I visit path "https://e2e-test-quest.github.io/simple-webapp/?template1"
      Then I should see an element with aria-label "flegend"

  Scenario: je me connecte3
    When I visit path "https://e2e-test-quest.github.io/simple-webapp/?template3"
    Then I should see an element with aria-label "flegend"
