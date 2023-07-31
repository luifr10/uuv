Feature: English Test Step Definition async
  Background:
    When I mock a request GET on url "https://e2e-test-quest.github.io/simple-webapp/uuvFixture.png" named "uuvFixture" with fixture mockUuv.jpg
    When I mock a request GET on url "https://e2e-test-quest.github.io/simple-webapp/uuvBody.png" named "uuvBody" with content "I am a content"
    When I mock a request GET on url "https://e2e-test-quest.github.io/simple-webapp/uuvStatus.png" named "uuvStatus" with status code 500
    When I visit path "https://e2e-test-quest.github.io/simple-webapp/"

#  Scenario: key.when.mock.withFixture & key.then.mock.consume
#    Then I should consume a mock named "uuvFixture"
#
#  Scenario: key.when.mock.withBody & key.then.mock.consume
#    Then I should consume a mock named "uuvBody"
#
#  Scenario: key.when.mock.withStatusCode & key.then.mock.consume
#    Then I should consume a mock named "uuvStatus"
