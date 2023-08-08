
# @uuv/cypress
<p align="center">  
<a href="https://orange-opensource.github.io/uuv/">  
<picture>  
<img alt="UUV Logo" src="https://orange-opensource.github.io/uuv/img/uuv.png">  
</picture>  
</a>  
</p>  

<h3 align="center">  
Test as final user  
</h3>  

<p align="center">  
Make test writing fast, understandable by any human understanding English or French.  
</p>  

<p align="center">  
<a href="https://www.npmjs.com/package/@uuv/cypress">  
<img src="https://img.shields.io/badge/available%20on%20npm-grey?logo=npm" alt="npm"/>  
</a>  
<a href="https://www.cypress.io/">  
<img src="https://img.shields.io/badge/tested with-cypress-04C38E?logo=cypress" alt="cypress"/>  
</a>  
<a href="https://testing-library.com/">  
<img src="https://img.shields.io/badge/tested%20with-testing%20library-ED3B3A?logo=testing-library" alt="testing-library"/>  
</a>  
<a href="https://cucumber.io/">  
<img src="https://img.shields.io/badge/tested%20with-cucumber-1dbb68?logo=cucumber" alt="cucumber"/>  
</a><br />  
</p>  

## Benefits
- If used correctly, integrates accessibility from the development stage
- A living documentation is possible because we propose an unified language for developers and non-developers with a rich dictionary of ready-to-use sentences
- [@uuv/assistant](https://www.npmjs.com/package/@uuv/assistant) that facilitates the writing of tests by suggesting the most accessible sentences
- Integrates several runtime engines: Cypress / Playwright
- User-friendly and standardized execution report
  ### <u>Comparison</u>
| Criteria | Cypress | Playwright | Testing library | UUV |  
|:-: |:-: |:-: |:-: |:-: |  
| User centrism | :x: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |  
| Native accessibility | :x: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |  
| Easy setup configuration for BDD test | :warning: | :warning: | :heavy_minus_sign: | :heavy_check_mark: |  
| Understandable by everyone <br> (included non dev) | :x: | :x: | :x: | :heavy_check_mark: |  

### <u>Syntax example</u>
With this dom example :
  ```html
  <body>
  <h1>Result<h1>
  </body>
```
we see that the sentence proposed by **UUV is the most understandable** of all
| Library | Syntax |
|:--|:--|
| Cypress  | cy.get('result').should('exist') |
| Playwright| await expect(page.getByTitle('Result')).toHaveCount(1) |
| Testing library  | expect(screen.getByTitle(/Result/i)).toBeTruthy() |
| UUV | Then I should see a title named "Result"|


## Documentation
<a href="https://orange-opensource.github.io/uuv/"><img src="https://img.shields.io/badge/documentation-black?&style=for-the-badge&logo=github&logoColor=white" alt="documentation"/></a>

## What is @uuv/cypress?

<p align="center">  

The `@uuv` library (User centric Usecases Validator) is an ecosystem that simplifies the writing of End to End tests in a BDD approach and a user-centric way.  
We can use the cypress engine to run test or playwright with [@uuv/playwright](https://www.npmjs.com/package/@uuv/playwright)
</p>  

## Demonstration

### Demo in english
<a href="https://player.vimeo.com/video/822253247?texttrack=en&h=617306172d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" rel="nofollow">  
<img alt="runner-cypress in english" src="https://orange-opensource.github.io/uuv/img/cypress/screenshot.png" style="max-width: 100%;" width="75%" height="75%" />  
</a>  

### Demo in french
<a href="https://player.vimeo.com/video/822253247?texttrack=fr&h=617306172d&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" rel="nofollow">  
<img alt="runner-cypress in french" src="https://orange-opensource.github.io/uuv/img/cypress/screenshot.png" style="max-width: 100%;" width="75%" height="75%" />  
</a>   

## Installation

```bash  
npm install --save-dev @uuv/cypress
```  
or
```bash  
yarn add -D @uuv/cypress
``` 
## Configuration  (optional)
<a href="https://orange-opensource.github.io/uuv/docs/getting-started/configuration"><img src="https://img.shields.io/badge/Configure%20cypress%20doc-red?&style=for-the-badge&logo=github&logoColor=white" alt="documentation for configure uuv cypress"/></a>

## Usage
### Scenarios example
You can find test examples here : [weather-app.feature](https://github.com/Orange-OpenSource/uuv/blob/main/example/weather-app.feature)

### Write test
To write your first test, create the file `uuv/e2e/first-test.feature` in the project root with the following content :
  ```gherkin
  Feature: Hello World

  Scenario: Search - Successful case
    When I visit path "/"
    Then I should see an element with role "heading" and name "My app title"
  ```

For more details, please go to the documentation:

<a href="https://orange-opensource.github.io/uuv/docs/test/first-test"><img src="https://img.shields.io/badge/Write%20test%20doc-red?&style=for-the-badge&logo=github&logoColor=white" alt="documentation for write test"/></a>

### Run test

#### browser mode
```bash  
npx uuv open
```  
or
```bash  
yarn uuv open
``` 

#### headless mode
##### without args
```bash  
npx uuv e2e
```  
or
```bash  
yarn uuv e2e
```
##### with args
```bash  
npx uuv e2e --browser=edge --env="{'TAGS':'@mobile'}" --generateHtmlReport
```
or
```bash  
yarn uuv e2e --browser=edge --env="{'TAGS':'@mobile'}" --generateHtmlReport
```

For more details, please go to the documentation:

<a href="https://orange-opensource.github.io/uuv/docs/test/running-test"><img src="https://img.shields.io/badge/Run%20test%20doc-red?&style=for-the-badge&logo=github&logoColor=white" alt="documentation for run test"/></a>

## License

[<a href="https://github.com/Orange-OpenSource/uuv/blob/main/LICENSE">  
<img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT license"/>  
</a>](https://spdx.org/licenses/MIT.html)

This project is licensed under the terms of the [MIT license](https://github.com/Orange-OpenSource/uuv/blob/main/LICENSE).

## Authors

- [@luifr10](https://github.com/luifr10)
- [@stanlee974](https://github.com/stanlee974)

