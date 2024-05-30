import "primereact/resources/themes/md-light-indigo/theme.css";
import "primereact/resources/themes/soho-dark/theme.css";

# Improving accessibility

To improve the accessibility of your application, we recommend that you :
- Write your scenarios according to [our recommendations](/docs/recommendations/writing-good-e2e-tests)
- Write keyboard navigation test, here's an example :
  <iframe src="https://carbon.now.sh/embed?bg=rgba%280%2C0%2C0%2C1%29&t=seti&wt=sharp&l=gherkin&width=795&ds=true&dsyoff=0px&dsblur=0px&wc=true&wa=true&pv=0px&ph=0px&ln=true&fl=1&fm=Hack&fs=14px&lh=133%25&si=false&es=2x&wm=false&code=Feature%253A%2520Keyboard%2520Navigation%250A%250A%2520%2520Scenario%253A%2520Focus%2520on%2520app%2520link%2520with%2520back%2520nav%250A%2520%2520%2509Given%2520I%2520visit%2520path%2520%2522https%253A%252F%252Fe2e-test-quest.github.io%252Fweather-app%252F%2522%250A%2520%2520%2520%2520When%2520I%2520start%2520a%2520keyboard%2520navigation%2520from%2520the%2520top%2520of%2520the%2520page%250A%2520%2520%2520%2520%2523%2520Check%2520keyboard%2520navigation%2520%250A%2520%2520%2520%2520Then%2520the%2520next%2520keyboard%2520element%2520focused%2520should%2520be%2520a%2520link%2520named%2520%2522Weather%2520App%27s%2520Logo%2522%250A%2520%2520%2520%2520%2520And%2520the%2520next%2520keyboard%2520element%2520focused%2520should%2520be%2520a%2520link%2520named%2520%2522Home%2522%250A%2520%2520%2520%2520%2520And%2520the%2520next%2520keyboard%2520element%2520focused%2520should%2520be%2520a%2520button%2520named%2520%2522Get%2520started%2522%250A%2520%2520%2520%2520%2520And%2520the%2520previous%2520keyboard%2520element%2520focused%2520should%2520be%2520a%2520link%2520named%2520%2522Home%2522" style={{ margin: '20px 0 0 0', width: '800px', maxWidth: '100%', minHeight: '295px', border: '0', transform: 'scale(1)', overflow:'hidden'}} sandbox="allow-scripts allow-same-origin"></iframe>
- Use accessibility check sentences where the following tools are availables :
  - [axe-core](/docs/wordings/generated-wording-description/en-generated-wording-description/#i-should-not-have-any-axe-core-accessibility-issue) to perform Axe-Core checks
  - [@uuv/a11y](/docs/wordings/generated-wording-description/en-generated-wording-description/#i-should-not-have-any-rgaa-accessibility-issue) : to perform RGAA checks

