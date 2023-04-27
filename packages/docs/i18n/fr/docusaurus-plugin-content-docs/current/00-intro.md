# Concepts

La librairie `@nobelisation/uuv` (User centric Usecases Validator) est un écosystème qui simplifie l'écriture de tests
End to End dans une approche BDD et du point de vue d'utilisateur final.

## Le problème

La mise en place de tests de logiciels automatisés est une pratique de plus en plus répandue. Cela ajoute un meilleur
niveau de qualité sur le code d’une application par la vérification de la non-regression ou encore la validation des
scénarios d'utilisation.

La typologie de `test End to End` (de bout en bout) est une technique utilisée pour vérifier si une application (web,
mobile...) se comporte comme prévu, du début à la fin. Elle consiste à vérifier que l’utilisateur final puisse achever
les principaux scénarios d’utilisation de l’application.

Contrairement au `test unitaire` qui a pour seul but de verifier le comportement d’une fonction, ou
au `test d'intégration` qui consiste à faire interagir plusieurs modules de l’application entre eux afin de voir leur
bonne coopération, Le `test End to End` permet de vérifier depuis un navigateur (par exemple pour les applications web)
le comportement de votre application d'après un ensemble de scénarios d'utilisation.

> Lors des `test E2E`, les validations consistent la plupart du temps à vérifier les éléments restitués à l'utilisateur
> via le navigateur web ([DOM](https://developer.mozilla.org/fr/docs/Web/API/Document_Object_Model))

Dès lors, plusieurs questions complémentaires se posent :

- **Comment exprimer clairement des scénarios d'utilisation ?**
- **Pour les applications omnicanales, comment faire pour vérifier votre application sur différents navigateurs et
  terminaux ?**
- **Comment effectuer des vérifications de DOM pertinents en gardant un point de vue utilisateur ?**

## Notre solution

Pour répondre aux problématiques ci-dessus et bien d'autres, notre solution est de mettre en place un écosystème cohérent s'appuyant sur des outils qui sont des références dans leur domaine.

## Ecosystème
![Ecosystème UUV](@site/static/img/docs/ecosystem-uuv.png)

- ### Accessibilité
  - *[Testing Library](https://testing-library.com/docs/)* : Pour effectuer des vérifications de DOM basées [les roles et attributs accessibles](https://www.w3.org/TR/accname-1.1/)
  - *[Axe Core](https://github.com/dequelabs/axe-core)* : Pour détecter les anomalies d'accessibilité


- ### BDD : Behaviour Driven Development
  - *[Cucumber](https://cucumber.io/)* : Pour l'expression des cas d'usages dans un language compréhensible par tout humain


- ### Runners : Vous pouvez choisir entre
  - *[Cypress](https://www.cypress.io/)*
  - *[Playwright](https://playwright.dev/)* : **WIP**


## Les avantages
- Si bien utilisé, intègre l’accessibilité dès le développement
- Langage unifié pour développeurs et non développeurs avec un [dictionnaire riche](category/step-definition) de phrases prêtes à l’emploi
- [Assistant](tools/uuv-assistant) pour écrire scénarios rapidement
- Gère plusieurs runner (Cypress, Playwright)
- Rapport d’exécution user friendly et uniformisé
