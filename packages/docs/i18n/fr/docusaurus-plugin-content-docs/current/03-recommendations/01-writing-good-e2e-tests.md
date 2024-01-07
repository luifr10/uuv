# Ecrire de bons tests E2E

:::tip
Vos scénarios de tests doivent ressembler autant que possible aux interactions utilisateur avec votre application.<br/>
Pour cela nous vous recommandons cet ordre de priorité dans vos vérifications de DOM :
:::

## 1. Requêtes basées sur l'accessibilité
1. ### Rechercher un élément à partir de son [rôle accessible](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles#aria_role_types) et son contenu
2. ### Rechercher un élément à partir de son contenu
3. ### Rechercher un élément à partir de son attribut aria-label

## 2. Test IDs
1. ### Rechercher un élément à partir de son attribut data-testid

