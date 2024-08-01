#language: fr
Fonctionnalité: Within and type
  Scénario: key.when.withinElement.withRoleBased and click
    Etant donné que je visite l'Url "https://e2e-test-quest.github.io/weather-app/?isStarted=true"
    Et je clique sur le bouton nommé "Add new town"
    Quand je vais à l'intérieur de l'élément ayant pour sélecteur "#new-town-name"
    Et je saisie les mots "why always me ?"
    Et je reinitialise le contexte
    Et je dois voir une boîte à texte nommée "Town name" et contenant "why always me ?"
    Et je vais à l'intérieur du bouton rotatif nommé "Latitude"
    Et j'entre la valeur "15"
    Et je reinitialise le contexte
    Alors je dois voir un bouton rotatif nommé "Latitude" et contenant "15"


  Scénario: key.when.withinElement.selector and click
    Etant donné que je visite l'Url "https://e2e-test-quest.github.io/weather-app/?isStarted=true"
    Et je clique sur le bouton nommé "Add new town"
    Quand je vais à l'intérieur de l'élément ayant pour sélecteur "#new-town-name"
    Et je saisie les mots "why always me ?"
    Et je reinitialise le contexte
    Et je dois voir une boîte à texte nommée "Town name" et contenant "why always me ?"
    Et je vais à l'intérieur de l'élément ayant pour sélecteur "#new-town-latitude"
    Et j'entre la valeur "15"
    Et je reinitialise le contexte
    Alors je dois voir un bouton rotatif nommé "Latitude" et contenant "15"

