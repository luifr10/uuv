Feature: JetSnack

  Scenario: Home
    When I reload app
    Then I should see an element with content "Organic" and attributes
      | attribute | value |
      | clickable | true  |
      | checked   | false  |

  Scenario: Filter on organic
    When I reload app
    And I tap on an text containing "Organic"
    Then I should see an element with content "Organic" and attributes
      | attribute | value |
      | clickable | true  |
      | checked   | true  |