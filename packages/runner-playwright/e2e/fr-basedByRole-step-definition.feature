#language: fr
@Playwright
Fonctionnalité: phrases enrichies

  Contexte:
    Etant donné que je visite l'Url "https://e2e-test-quest.github.io/simple-webapp/"

  Règle: role, name or content
    Scénario: key.then.element.withRoleAndName
      Alors je dois voir un titre nommé "Grouping Form Data with Fieldset"

    Scénario: key.then.element.not.withRoleAndName
      Alors je ne dois pas voir un titre nommé "[NOT] Grouping Form Data with Fieldset"

    Scénario: key.then.element.withRoleAndNameAndContent
      Alors je dois voir un bouton nommé "titleButton" et contenant "save"

    Scénario: key.then.element.withRoleAndNameAndContentDisabled
      Alors je dois voir une boîte à texte nommée "First name" et contenant "John" inactif

    Scénario: key.then.element.withRoleAndNameAndContentEnabled
      Alors je dois voir une boîte à texte nommée "Last name" et contenant "Doe" actif

  Règle: Attributes
    Scénario: key.then.attributes.withValues
      Alors je vais à l'intérieur de boîte à texte nommée "First name"
      Et je dois voir les attributs avec valeurs suivantes
        | class | fname-class |



