#language: fr
@Playwright
Fonctionnalité: Dictionnaire français de phrases de base utilisant playwright

  Contexte:
    Etant donné que je visite l'Url "https://e2e-test-quest.github.io/simple-webapp/"

  Scénario: key.then.element.withAriaLabel
    Alors je dois voir un élément ayant pour aria-label "flegend"

  Scénario: key.then.element.not.withAriaLabel
    Alors je ne dois pas voir un élément ayant pour aria-label "[NOT] flegend"

  Scénario: key.then.element.withAriaLabelAndContent
    Alors je dois voir un élément ayant pour aria-label "flegend" et pour contenu "Personalia"

  Scénario: key.then.element.withContent
    Alors je dois voir un élément qui contient "The fieldset element is used to group related data in a form, and the legend element defines a caption for the"

  Scénario: key.then.element.not.withContent
    Alors je ne dois pas voir un élément qui contient "[NOT] The fieldset element is used to group related data in a form, and the legend element defines a caption for the"

  Scénario: key.then.element.withTestId
    Alors je dois voir un élément ayant pour testId "fieldset"

  Scénario: key.then.element.not.withTestId
    Alors je ne dois pas voir un élément ayant pour testId "[NOT] fieldset"

  Scénario: key.then.element.withRoleAndName
    Alors je dois voir un élément avec le rôle "heading" et le nom "Grouping Form Data with Fieldset"

  Scénario: key.then.element.not.withRoleAndName
    Alors je ne dois pas voir un élément avec le rôle "heading" et le nom "[NOT] Grouping Form Data with Fieldset"
    Alors je ne dois pas voir un élément avec le rôle "NOTheading" et le nom "Grouping Form Data with Fieldset"

  Scénario: key.then.element.withRoleAndNameAndContent
    Alors je dois voir un élément avec le rôle "button" et le nom "Reset" et pour contenu "Reset"

  Scénario: key.then.element.withRoleAndNameAndContentDisabled
    Alors je dois voir un élément avec le rôle "textbox" et le nom "First name" et pour contenu "John" inactif

  Scénario: key.then.element.withRoleAndNameAndContentEnabled
    Alors je dois voir un élément avec le rôle "textbox" et le nom "Last name" et pour contenu "Doe" actif

  Scénario: key.then.list.withNameAndContent
    Alors je dois voir des elements de la liste ayant pour nom "test-list"
      | a |
      | b |
      | c |

  Scénario: key.then.attributes.withValues
    Alors je vais à l'intérieur de l'élément ayant pour rôle "textbox" et pour nom "First name"
    Et je dois voir les attributs avec valeurs suivantes
      | class | fname-class |

  Scénario: key.then.element.key.when.click
    Et je vais à l'intérieur de l'élément ayant pour testId "fieldset"
    Et je vais à l'intérieur de l'élément ayant pour rôle "button" et pour nom "Submit"
    Quand je clique
    Et je reinitialise le contexte
    Alors je dois voir un titre nommé "404"

  Scénario: key.then.element.key.when.type
    Et je vais à l'intérieur de l'élément ayant pour testId "fieldset"
    Et je vais à l'intérieur de l'élément ayant pour rôle "textbox" et pour nom "Last name"
    Quand je saisie les mots "Toto"
    Et je reinitialise le contexte
    Alors je dois voir un élément avec le rôle "textbox" et le nom "Last name" et pour contenu "Toto"

  Scénario: key.given.within.selector
    Alors je vais à l'intérieur de l'élément ayant pour sélecteur '[data-testid="fieldset"]'
    Alors je vais à l'intérieur de l'élément ayant pour sélecteur '#fname'
    Et je dois voir les attributs avec valeurs suivantes
      | class | fname-class |
    Et je reinitialise le contexte
