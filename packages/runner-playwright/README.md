
# @uuv/runner-playwright
<p align="center">  
<a href="https://e2e-test-quest.github.io/uuv/">  
<picture>  
<img alt="UUV Logo" src="https://e2e-test-quest.github.io/uuv/img/uuv.png">  
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
<a href="https://www.npmjs.com/package/@uuv/playwright">  
<img src="https://img.shields.io/badge/available%20on%20npm-grey?logo=npm" alt="npm"/>  
</a>  
<a href="https://playwright.dev/">  
<img src="https://img.shields.io/badge/tested with-playwright-1dbb68?logo=playwright" alt="playwright"/>  
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
- A wizard that facilitates the writing of tests by suggesting the most accessible sentences
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
<a href="https://e2e-test-quest.github.io/uuv/"><img src="https://img.shields.io/badge/documentation-black?&style=for-the-badge&logo=github&logoColor=white" alt="documentation"/></a>

## What is @uuv/playwright?


<p align="center">  

The `@uuv` library (User centric Usecases Validator) is an ecosystem that simplifies the writing of End to End tests in a BDD approach and a user-centric way.  
We can use the playwright engine to run test or cypress with [@uuv/cypress](https://www.npmjs.com/package/@uuv/cypress)
</p>  


## Installation


```bash  
npm install --save-dev @uuv/playwright
```  
or
```bash  
yarn add -D @uuv/playwright
``` 
## Configuration  (optional)
<a href="https://e2e-test-quest.github.io/uuv/docs/getting-started/configuration"><img src="https://img.shields.io/badge/Configure%20Playwright%20doc-red?&style=for-the-badge&logo=github&logoColor=white" alt="documentation for configure uuv playwright"/></a>

## Usage

### Scenarios example
You can find test examples here : [google.feature](https://github.com/e2e-test-quest/uuv/example/google.fr.feature)

### Write test
To write your first test, create the file `uuv/e2e/first-test.feature` in the project root with the following content :
  ```gherkin
  Feature: Hello World

  Scenario: Search - Successful case
    When I visit path "/"
    Then I should see an element with role "heading" and name "My app title"
  ```

For more details, please go to the documentation:
<a href="https://e2e-test-quest.github.io/uuv/docs/test/first-test"><img src="https://img.shields.io/badge/Write%20test%20doc-red?&style=for-the-badge&logo=github&logoColor=white" alt="documentation for write test"/></a>

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
<a href="https://e2e-test-quest.github.io/uuv/docs/test/running-test"><img src="https://img.shields.io/badge/Run%20test%20doc-red?&style=for-the-badge&logo=github&logoColor=white" alt="documentation for run test"/></a>

## License

[<a href="https://github.com/e2e-test-quest/uuv/blob/main/LICENSE">  
<img src="https://img.shields.io/badge/license-Apache%202.0-blue" alt="apache license"/>  
</a>](https://www.apache.org/licenses/LICENSE-2.0)

This project is licensed under the terms of the [Apache 2.0 license](https://github.com/e2e-test-quest/uuv/blob/main/LICENSE).

## Authors

- [@luifr10](https://github.com/luifr10)
- [@stanlee974](https://github.com/stanlee974)

