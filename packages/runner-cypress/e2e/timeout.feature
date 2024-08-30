Feature: Timeout

  Scenario: Click success with custom timeout
    Given I visit path "https://e2e-test-quest.github.io/simple-webapp/"
    When I click on button named "Start timer"
    And I set timeout with value 15000
    Then I click on button named "Timer ended"


  Scenario: Chaining within
    Given I visit path "https://e2e-test-quest.github.io/simple-webapp/"
    When within a button named "Reset"
    And I click
    And I reset context
    And within a button named "Start timer"
    And I click
    And I reset context
    And I set timeout with value 15000
    Then I should see a button named "Timer ended"