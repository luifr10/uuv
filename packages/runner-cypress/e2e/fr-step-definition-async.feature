#language: fr
Fonctionnalité: French Test Step Definition

  Contexte:
    Etant donné que je simule une requête GET sur l'url "https://e2e-test-quest.github.io/simple-webapp/uuvFixture.png" nommée "uuvFixture" avec le fichier suivant mockUuv.jpg
    Etant donné que je simule une requête GET sur l'url "https://e2e-test-quest.github.io/simple-webapp/uuvBody.png" nommée "uuvBody" avec le contenu suivant "je suis le contenu"
    Etant donné que je simule une requête GET sur l'url "https://e2e-test-quest.github.io/simple-webapp/uuvStatus.png" nommée "uuvStatus" avec le code http 500
    Etant donné que je visite l'Url "https://e2e-test-quest.github.io/simple-webapp/"

  Scénario: key.when.mock.withFixture & key.then.mock.consume
    Alors je dois consommer le bouchon nommé "uuvFixture"

  Scénario: key.when.mock.withBody & key.then.mock.consume
    Alors je dois consommer le bouchon nommé "uuvBody"

  Scénario: key.when.mock.withStatusCode & key.then.mock.consume
    Alors je dois consommer le bouchon nommé "uuvStatus"