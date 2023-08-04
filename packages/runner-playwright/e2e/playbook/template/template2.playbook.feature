@Ignore
Feature: Template

    Scenario: je me connecte2
      When I visit path "https://e2e-test-quest.github.io/simple-webapp/?template2"
      Then I should see an element with aria-label "flegend"
