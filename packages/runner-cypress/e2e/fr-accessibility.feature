#language: fr
Fonctionnalité: Accessibility Step Definition

  Scénario: key.then.a11y.check.default
    Lorsque je visite l'Url "https://e2e-test-quest.github.io/simple-webapp/"
    Alors je ne dois pas avoir de problèmes d'accessibilité

  Scénario: key.then.a11y.check.onlyCritical
    Lorsque je visite l'Url "https://e2e-test-quest.github.io/weather-app/"
    Et je vais à l'intérieur de bouton nommée "Get started"
    Et je clique
    Et je reinitialise le contexte
    Alors I should not have any critical accessibility issue

  Scénario: key.then.a11y.check.withFixtureOption
    Lorsque je visite l'Url "https://e2e-test-quest.github.io/weather-app/"
    Et je vais à l'intérieur de bouton nommée "Get started"
    Et je clique
    Et je reinitialise le contexte
    Alors I should not have any accessibility issue with option json fixture withExperimentalOption.json

  Scénario: key.then.a11y.check.withImpacts
    Lorsque je visite l'Url "https://e2e-test-quest.github.io/weather-app/"
    Et je vais à l'intérieur de bouton nommée "Get started"
    Et je clique
    Et je reinitialise le contexte
    Alors je ne dois pas avoir de problèmes d'accessibilité avec les impacts critical

  Scénario: key.then.a11y.check.withFixtureContextAndFixtureOption
    Lorsque je visite l'Url "https://e2e-test-quest.github.io/weather-app/"
    Et je vais à l'intérieur de bouton nommée "Get started"
    Et je clique
    Et je reinitialise le contexte
    Alors je ne dois pas avoir de problèmes d'accessibilité sur le fichier json suivant de contexte withExcludeErrorContext.json et avec le fichier json suivant d'option withBestPracticeOption.json

  Scénario: key.then.a11y.check.withTags
    Lorsque je visite l'Url "https://e2e-test-quest.github.io/weather-app/"
    Et je vais à l'intérieur de bouton nommée "Get started"
    Et je clique
    Et je reinitialise le contexte
    Alors je ne dois pas avoir de problèmes d'accessibilité avec le standard wcag2a

