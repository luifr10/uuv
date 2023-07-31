#language: fr
Fonctionnalité: phrases custom
  Contexte:
    Etant donné que je visite l'Url "https://e2e-test-quest.github.io/simple-webapp/"

  Plan du Scénario: key.given.within.selector
    Alors je suis une phrase custom qui vérifie l'existence d'un noeud par le sélecteur <selector>
    Et je reinitialise le contexte
    Exemples:
      |selector|
      |'[data-testid="fieldset"]'|
      |"[class=fname-class]"|
