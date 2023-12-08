#language: fr
Fonctionnalité: Accessibility Step Definition

  Règle: a11y
    Scénario: key.then.a11y.check.default
      Lorsque je visite l'Url "https://e2e-test-quest.github.io/simple-webapp/"
      Alors je ne dois pas avoir de problèmes d'accessibilité

    Scénario: key.then.a11y.check.onlyCritical
      Lorsque je visite l'Url "https://e2e-test-quest.github.io/weather-app/"
      Et je vais à l'intérieur du bouton nommé "Get started"
      Et je clique
      Et je reinitialise le contexte
      Alors je ne dois pas avoir de problèmes d'accessibilité de niveau critique

    Scénario: key.then.a11y.check.withFixtureOption
      Lorsque je visite l'Url "https://e2e-test-quest.github.io/weather-app/"
      Et je vais à l'intérieur du bouton nommé "Get started"
      Et je clique
      Et je reinitialise le contexte
      Alors je ne dois pas avoir de problèmes d'accessibilité avec le fichier json suivant d'option withExperimentalOption.json

    Scénario: key.then.a11y.check.withImpacts
      Lorsque je visite l'Url "https://e2e-test-quest.github.io/weather-app/"
      Et je vais à l'intérieur du bouton nommé "Get started"
      Et je clique
      Et je reinitialise le contexte
      Alors je ne dois pas avoir de problèmes d'accessibilité avec les impacts critical

    Scénario: key.then.a11y.check.withFixtureContextAndFixtureOption
      Lorsque je visite l'Url "https://e2e-test-quest.github.io/weather-app/"
      Et je vais à l'intérieur du bouton nommé "Get started"
      Et je clique
      Et je reinitialise le contexte
      Alors je ne dois pas avoir de problèmes d'accessibilité sur le fichier json suivant de contexte withExcludeErrorContext.json et avec le fichier json suivant d'option withBestPracticeOption.json

  Scénario: key.then.a11y.check.withTags
    Lorsque je visite l'Url "https://e2e-test-quest.github.io/weather-app/"
    Et je vais à l'intérieur du bouton nommé "Get started"
    Et je clique
    Et je reinitialise le contexte
    Alors je ne dois pas avoir de problèmes d'accessibilité avec le standard wcag2a

  Règle: touches d'accessibilité
    Scénario: key.then.keyboard.press - Reverse Tab & Tab
      Lorsque je visite l'Url "https://e2e-test-quest.github.io/weather-app/"
      Et je vais à l'intérieur du bouton nommé "Get started"
      Et j'appuie sur "{reverseTab}"
      Et j'appuie sur "{tab}"
      Et je clique

    Scénario: key.then.keyboard.multiplePress - Reverse Tab & Tab
      Lorsque je visite l'Url "https://e2e-test-quest.github.io/weather-app/"
      Et je clique sur le bouton nommé "Get started"
      Et je saisie les mots "i" dans la boîte à texte nommée "Search for a town"
      Et je reinitialise le contexte
      Et je vais à l'intérieur du lien nommé "Home"
      Et j'appuie 2 fois sur "{tab}"
      Et je clique
      Et je reinitialise le contexte
      Alors je dois voir des elements de la liste ayant pour nom "Available Towns"
        | Tunis   |
        | Limoges |

    Scénario: key.then.keyboard.press - Left right
      Lorsque je visite l'Url "https://e2e-test-quest.github.io/weather-app/"
      Et je vais à l'intérieur du bouton nommé "Get started"
      Et je clique
      Et je reinitialise le contexte
      Et je vais à l'intérieur de la boîte à texte nommée "Search for a town"
      Et je saisie les mots "mo"
      Et j'appuie 2 fois sur "{left}"
      Et je saisie les mots "Li"
      Et j'appuie 2 fois sur "{right}"
      Et je saisie les mots "ges"
      Et je reinitialise le contexte
      Alors je dois voir une boîte à texte nommée "Search for a town" et contenant "Limoges"

    Scénario: key.then.keyboard.press - Up Down
      Lorsque je visite l'Url "https://e2e-test-quest.github.io/weather-app/"
      Et je vais à l'intérieur du bouton nommé "Get started"
      Et je clique
      Et je reinitialise le contexte
      Et je vais à l'intérieur de la boîte à texte nommée "Search for a town"
      Et je saisie les mots "mo"
      Et j'appuie sur "{up}"
      Et je saisie les mots "Li"
      Et j'appuie sur "{down}"
      Et je saisie les mots "ges"
      Et je reinitialise le contexte
      Alors je dois voir une boîte à texte nommée "Search for a town" et contenant "Limoges"
