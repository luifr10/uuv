# FAQ

## Vous n'arrivez pas à exécuter les tests normalement ?

<Tabs>
<TabItem value="cypress" label="Cypress">

:::caution
Cette étape n'est nécessaire que si vous avez choisi le runner `Cypress` et que vous n'arrivez pas à [exécuter normalement les tests](/docs/test/running-test).
:::
Modifier le fichier `package.json` pour rajouter les lignes suivantes dans la section script :

```json title='package.json'
{
...
    "scripts": {
        "...
        "uuv": "node node_modules/@uuv/cypress/bin/uuv"
    },
  ...
}
```

</TabItem>
<TabItem value="playwright" label="Playwright">

:::caution
Cette étape n'est nécessaire que si vous avez choisi le runner `Playwright` et que vous n'arrivez pas à [exécuter normalement les tests](/docs/test/running-test).
:::
Modifier le fichier `package.json` pour rajouter les lignes suivantes dans la section script :

```json title='package.json'
{
...
    "scripts": {
        "...
        "uuv": "node node_modules/@uuv/playwright/bin/uuv"
    },
  ...
}
```

</TabItem>
</Tabs>

## Vous n'arrivez pas à exécuter les tests jetbrains-plugin

### Cas 1 : l'attribut Target script est nulle
De temps en temps, l'**attribut Target script** s'efface. Il faut donc l'alimenter avec open ou e2e ([bug identifié](https://github.com/Orange-OpenSource/uuv/issues/305 "Ouverture dans un nouvel onglet du bug 305"))

#### Message

![Commande open ou e2e est nulle](@site/static/img/docs/jetbrain-plugin/error/error_command_open_or_e2e.png)

#### Solution

![l'attribut target script de la configuration UUV](@site/static/img/docs/jetbrain-plugin/error/solution_open_e2e_command.png)

### Case 2 : La commande npm est introuvable ou La commande npx est introuvable
Sur MacOs, la variable d'environnement PATH n'est pas lue. On doit donc **renseigner le chemin de l'exécutable npm et node** dans le paramètre Environment variables de UUV run/debug configuration

#### Message

![Le programme npm ne peut pas être lancé](@site/static/img/docs/jetbrain-plugin/error/error_path_inaccessible_npm.png)

ou 

![Le programme npx ne peut pas être lancé](@site/static/img/docs/jetbrain-plugin/error/error_path_inaccessible_npx.png)

#### Solution

Dans la configuration d'exécution/débogage de l'UUV, définissez la variable d'environnement `Path` dans le champ **Variables d'environnement** (cliquez sur ![Icône des variables d'environnement] (https://resources.jetbrains.com/help/img/idea/2023.1/app.general.inlineVariables.svg)).

Vous pouvez :
- soit définir la valeur manuellement :
  ![script cible de la configuration UUV](@site/static/img/docs/jetbrain-plugin/error/solution_path_inaccessible.png)
- Ou copier la valeur de la variable système (suivre les étapes 1 à 4 de l'image suivante) :
  ![script cible de la configuration de l'UUV](@site/static/img/docs/jetbrain-plugin/error/solution_env_variable.png)
