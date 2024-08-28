Feature: Timeout

  Scenario: click success with custom timeout
    Given I visit path "https://e2e-test-quest.github.io/simple-webapp/"
    When I click on button named "Start timer"
    And I set timeout with value 15000
    Then I click on button named "Timer ended"
