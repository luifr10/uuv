#language: fr
Fonctionnalité: phrases custom
  Contexte:
    Etant donné que je visite l'Url "/tests/test-app"

  Scénario: key.given.within.selector
    Alors je suis une phrase custom qui vérifie l'existence d'un noeud par le sélecteur '[data-testid="fieldset"]'
    Et je reinitialise le contexte