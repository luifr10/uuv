
<p align="center">  
<a href="https://e2e-test-quest.github.io/uuv">  
<picture>  
<img alt="UUV Logo" src="./packages/docs/static/img/uuv.png">  
</picture>  
</a>  
</p>  

<p align="center">  
<a href="https://e2e-test-quest.github.io/uuv/"><img src="https://img.shields.io/badge/documentation-black?&style=for-the-badge&logo=github&logoColor=white" alt="documentation"/></a>  
</p> 

# Concepts

The `@uuv` library (User centric Usecases Validator) is an ecosystem that simplifies the writing of End to End tests in a BDD approach and a user-centric way.

## The problem

Automated software testing is a growing practice. It adds a better  
level of quality on the code of an application by verifying non-regression or validating use cases.


The `End to End test` is a technique used to verify if an application (web,  
mobile...) behaves as expected, from start to finish. It consists in verifying that the end user can complete the main usage scenarios of the application.

Unlike `unit test` which only aims to verifying the behavior of a function, or  
the `integration test` which consists in making several modules of the application interact with each other in order to see their good cooperation, the `End to End test` allows to check from a browser (for example for web applications), the `End to End test` allows to check from a browser (for example for web applications) the behavior of your application according to a set of use cases.

> During the `E2E test`, the validations consist most of the time in checking the elements returned to the user via the web browser ([DOM](https://developer.mozilla.org/fr/docs/Web/API/Document_Object_Model))

Therefore, several additional questions arise:

- How to clearly express use cases?
- For omnichannel applications, how to check your application on different browsers and devices?  
  For omnichannel applications, how do you check your application on different browsers and devices?**
- How to perform relevant DOM checks from a user perspective

## Our solution

To answer the above issues and many others, our solution is to set up a coherent ecosystem based on tools that are references in their field.

![Ecosystème UUV](./packages/docs/static/img/docs/ecosystem-uuv.png)

