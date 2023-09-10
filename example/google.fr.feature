Feature: English Test Step Definition

  Background:
    When I visit path "https://www.google.fr/"

  Scenario: expect example
    Then I should see a title named "Avant d'accéder à Google"

  Scenario: click example
    When I click on button named "Tout accepter"

  Scenario: click and expect example
    When I click on button named "Tout accepter"
    Then I should see a button named "Recherche Google"

  Scenario: fill example
    # validate cookies preference
    When I click on button named "Tout accepter"

    # focus textarea and search github "@uuv"
    When Within an combo box named "Rech."
    Then I type the sentence "github \"@uuv\" {enter}"
    Then I reset context

    Then I should see a title named "e2e-test-quest/uuv" and containing "e2e-test-quest/uuv"
