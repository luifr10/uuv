import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Scénarios réutilisables

:::caution
**Disponible seulement pour les développeurs**

Les scénarios réutilisables ne peuvent être utilisés entre eux.
:::

## Créer un fichier avec l'extension .playbook.feature
Les fichiers avec cette extension contiennent des scénarios réutilisables

```gherkin title='uuv/e2e/playbook/template.playbook.feature'
@Ignore //Seulement utile avec playwright
  #language: fr
Fonctionnalité: Template

  Scénario: j'aille à la liste des villes
    Lorsque je visite l'Url "https://e2e-test-quest.github.io/weather-app/"
    Et je vais à l'intérieur de bouton nommé "Get started"
    Et je clique

  Scénario: je sélectionne douala
    Lorsque je visite l'Url "https://e2e-test-quest.github.io/weather-app/"
    Et je vais à l'intérieur de bouton nommé "Get started"
    Et je clique
    Et je reinitialise le contexte
    Et je vais à l'intérieur de liste nommée "Available Towns"
    Et je vais à l'intérieur de élément de liste nommé "Douala"
    Et je clique
    Et je reinitialise le contexte
```

## Créer un fichier avec l'extension .playbooked.feature
Les fichiers avec cet extension contiennent des scénarios utilisant les scénarios réutilisables

```gherkin title='uuv/e2e/playbook/weatherApp.playbooked.feature'
@Ignore //Seulement utile avec playwright
  #language: fr
  Fonctionnalité: Fonctionnalité utilisant les scénarios réutilisables
    Scénario: vérification vital de la première page
      Etant donné que j'aille à la liste des villes
      Alors je dois voir un titre nommé "Nothing to display"
    Scénario: vérification vital de la seconde page
      Etant donné que je sélectionne douala
      Lorsque je vais à l'intérieur de l'élément ayant pour aria-label "Weather of Douala"
      Alors je dois voir un titre nommé "Douala"
      Et je dois voir un élément qui contient "min: 10.8 °c"
```

## Lancement du script de génération de feature éxecutable
Ce script remplace les noms de scénarios des playbooks par les étapes de scénarios des playbooks.

<Tabs>
<TabItem value="Npm" label="Npm">

```shell
npx uuv playbook
```

</TabItem>
<TabItem value="Yarn" label="Yarn">

```shell
yarn uuv playbook
```

</TabItem>
</Tabs>
