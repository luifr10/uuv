import "primereact/resources/themes/md-light-indigo/theme.css";
import "primereact/resources/themes/soho-dark/theme.css";

# Improving accessibility

To improve the accessibility of your application, we recommend that you :
- Write your scenarios according to [our recommendations](/docs/recommendations/writing-good-e2e-tests)
- Write keyboard navigation test, here's an example :
  ```gherkin
  Scenario: Focus on app link with back nav
      Given I visit path "https://e2e-test-quest.github.io/weather-app/"
      When I start a keyboard navigation from the top of the page
      Then I should see a link named "Weather App's Logo" keyboard focused
       And I go to next keyboard element
       And I should see a link named "Home" keyboard focused
       And I go to next keyboard element
       And I should see a button named "Get started" keyboard focused
       And I go to previous keyboard element
       And I should see a link named "Home" keyboard focused
  ```
- Use accessibility check sentences where the following tools are availables :
  - [axe-core](/docs/wordings/generated-wording-description/en-generated-wording-description/#i-should-not-have-any-axe-core-accessibility-issue) to perform Axe-Core checks
  - [@uuv/a11y](/docs/wordings/generated-wording-description/en-generated-wording-description/#i-should-not-have-any-rgaa-accessibility-issue) : to perform RGAA checks

