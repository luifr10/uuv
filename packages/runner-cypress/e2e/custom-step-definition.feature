#language: fr
Fonctionnalité: phrases Unsafe

  Contexte:
    Etant donné que je visite l'Url "https://e2e-test-quest.github.io/simple-webapp/"

  Scénario: key.given.within.selector
    Alors je suis une phrase custom qui vérifie l'existence d'un noeud par le sélecteur '[data-testid="fieldset"]'
    Et je reinitialise le contexte