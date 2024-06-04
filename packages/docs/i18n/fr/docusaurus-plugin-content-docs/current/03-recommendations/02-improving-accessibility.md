# Améliorer l'accessibilité

Pour améliorer l'accessibilité de vos applications, nous vous recommandons :
- Ecrire vos scénarios en respectant les [recommandations](/docs/recommendations/writing-good-e2e-tests)
- Tester la navigation au clavier, voici un exemple :
  ```gherkin
    #language: fr
    Fonctionnalité: Navigation au clavier
      Scénario: Focus on app link with back nav
        Etant donné que je visite l'Url "https://www.google.fr/"
        Quand je commence une navigation au clavier depuis le haut de la page
        Alors le prochain élément avec le focus clavier doit être un lien nommé "Gmail"
        Et le prochain élément avec le focus clavier doit être un lien nommé "Rechercher des images"
        Et le prochain élément avec le focus clavier doit être un bouton nommé "Applications Google"
  ```
- Utiliser les phrases pour effectuer des vérification d'accessibilité. les outis suivants sont disponibles :
  - [axe-core](/docs/wordings/generated-wording-description/fr-generated-wording-description#je-ne-dois-pas-avoir-de-probl%C3%A8mes-daccessibilit%C3%A9-axe-core) : pour effectuer des vérifications Axe-Core
  - [@uuv/a11y](/docs/wordings/generated-wording-description/fr-generated-wording-description#je-ne-dois-pas-avoir-de-probl%C3%A8mes-daccessibilit%C3%A9-rgaa) : pour effectuer des vérifications RGAA
