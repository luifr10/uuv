#language: fr
Fonctionnalité: Composants cochable

    Contexte:
        Etant donné que je visite l'Url "https://e2e-test-quest.github.io/weather-app/?isStarted=true"
        Quand je clique sur le bouton nommé "Add new town"

    Scénario: Radio button
        Alors je dois voir un bouton radio nommé "Small (under 150000)" coché
        Et je dois voir un bouton radio nommé "Medium (150000 to 1 million)" décoché

    Scénario: Radio button and click
        Quand I click on element with role "radio" and name "Medium (150000 to 1 million)"
        Alors je dois voir un bouton radio nommé "Medium (150000 to 1 million)" coché
        Alors je dois voir un bouton radio nommé "Small (under 150000)" décoché

    Scénario: Checkbox
        Alors je dois voir une case à cocher nommée "Allow automatic update" décochée

    Scénario: Checkbox and click
        Quand I click on element with role "checkbox" and name "Allow automatic update"
        Alors je dois voir une case à cocher nommée "Allow automatic update" cochée
