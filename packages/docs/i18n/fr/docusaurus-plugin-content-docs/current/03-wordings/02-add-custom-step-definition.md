import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Ajouter vos propres phrases

## Installation de la dépendance ts-loader

Depuis powershell ou un terminal cmd **en mode non-administrateur** :


<Tabs>
<TabItem value="npm" label="Npm">

```shell
npm install --save-dev ts-loader
```

</TabItem>
<TabItem value="Yarn" label="Yarn">

```shell
yarn add -D ts-loader
```

</TabItem>
</Tabs>


## Ajout de vos propres phrases
### Cypress
Créer un fichier `.ts` ou `.js` dans le dossier `uuv/cucumber/step_definitions/`.<br/>
Voici un exemple :
```typescript title='uuv/cucumber/step_definitions/my-custom-step-definitions.ts'
import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";

Given('My first custom step definition', () => {
  const myVar = 'foo';
});

Then('My second custom step definition', () => {
  // Your verification
  expect(true).toBeTruthy();
});
```
Pour plus d'informations sur la mise en place de phrases cucumber, consulter cette [documentation](https://cucumber.io/docs/cucumber/step-definitions/?sbsearch=step+definition&lang=javascript)

#### (Optionnel) Utilisation des commandes Cypress UUV
Lors de la rédaction de vos propres phrases, vous pouvez utiliser :
- [Les commandes Cypress par défaut](https://docs.cypress.io/api/table-of-contents#Commands) 
- [Les commandes Cypress Testing Library](https://testing-library.com/docs/cypress-testing-library/intro#usage)
- Les commandes `Cypress UVV` suivantes :

##### `uuvGetContext(): Cypress.Chainable<Context>`
> Retourne le contexte courant (élément Dom sélectionné & timeout) UUV

---

##### `uuvCheckContextFocusedElement(): Cypress.Chainable<Context>`
> Retourne élément Dom sélectionné dans le contexte UUV

---

##### `uuvPatchContext(partOfContext: any): Chainable<Context>`
> Mise à jour du contexte UUV

---

##### `uuvFindByText(textToSearch: string, roleOptions: ByRoleOptions): Cypress.Chainable<JQuery<HTMLElement>>`
> Recherche d'un élément à partir de son contenu textuel

---

##### `uuvFindByTestId(testId: string): Cypress.Chainable<JQuery<HTMLElement>>`
> Recherche d'un élément à partir de son attribut data-testid

---

##### `uuvFindByRole(role: string, roleOptions: ByRoleOptions): Cypress.Chainable<JQuery<HTMLElement>>`
> Recherche d'un élément à partir de son rôle accessible

---

##### `uuvFindByLabelText(labelTextToSearch: string, roleOptions: ByRoleOptions): Cypress.Chainable<JQuery<HTMLElement>>`
> Recherche d'un élément à partir de son libellé (idéal pour les champs de formulaire)

---

##### `uuvFindAllByRole(role: string, roleOptions: ByRoleOptions): Cypress.Chainable<JQuery<HTMLElement>>`
> Recherche tous les éléments correspondant à un rôle accessible

---

##### `uuvFoundedElement(): Cypress.Chainable<JQuery<HTMLElement>>`
> Retourne l'élément trouvé lorsqu'une recherche a été effectuée 

WIP Playwright
