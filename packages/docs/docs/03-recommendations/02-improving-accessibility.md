import "primereact/resources/themes/md-light-indigo/theme.css";
import "primereact/resources/themes/soho-dark/theme.css";

# Improving accessibility

To improve the accessibility of your application, we recommend that you :
- Write your scenarios according to [our recommendations](/docs/recommendations/writing-good-e2e-tests)
- Write keyboard navigation test, here's an example :
  ```gherkin
  Feature: Keyboard Navigation
    Scenario: Google homepage navigation
      Given I visit path "https://www.google.fr/"
      When I start a keyboard navigation from the top of the page
      Then the next keyboard element focused should be a link named "Gmail"
      And the next keyboard element focused should be a link named "Rechercher des images"
      And the next keyboard element focused should be a button named "Applications Google"
  ```
- Use accessibility check sentences where the following tools are availables :
  - [axe-core](/docs/wordings/generated-wording-description/en-generated-wording-description/#i-should-not-have-any-axe-core-accessibility-issue) to perform Axe-Core checks
  - [@uuv/a11y](/docs/wordings/generated-wording-description/en-generated-wording-description/#i-should-not-have-any-rgaa-accessibility-issue) : to perform RGAA checks

