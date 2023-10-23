# FAQ

WIP

### Pourquoi est-ce mieux d'utiliser les attributs accessible pour rechercher les éléments dans le DOM ?

### Vous n'arrivez pas à exécuter les tests normalement ?

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

### Vous n'arrivez pas à exécuter les tests jetbrains-plugin

#### Cas 1 : l'attribut Target script est nulle
De temps en temps, l'**attribut Target script** s'efface. Il faut donc l'alimenter avec open ou e2e ([bug identifié](https://github.com/Orange-OpenSource/uuv/issues/305 "Ouverture dans un nouvel onglet du bug 305"))

Message :

![Commande open ou e2e est nulle](@site/static/img/docs/jetbrain-plugin/error/error_command_open_or_e2e.png)

Solution :

![l'attribut target script de la configuration UUV](@site/static/img/docs/jetbrain-plugin/error/solution_open_e2e_command.png)

#### Case 2 : La commande npm est introuvable
Sur MacOs, la variable d'environnement PATH n'est pas lue. On doit donc **renseigner le chemin de l'exécutable npm et node** dans le paramètre Environment variables de UUV run/debug configuration

Message :

![Le programme npm ne peut pas être lancé](@site/static/img/docs/jetbrain-plugin/error/error_path_inaccessible_npm.png)

Solution :

![L'attribut path variable de la configuration UUV](@site/static/img/docs/jetbrain-plugin/error/solution_path_inaccessible.png)

#### Case 2 : La commande npx est introuvable
Sur MacOs, la variable d'environnement PATH n'est pas lue. On doit donc **renseigner le chemin de l'exécutable npx et node** dans le paramètre Environment variables de UUV run/debug configuration

Message :

![Le programme npx ne peut pas être lancé](@site/static/img/docs/jetbrain-plugin/error/error_path_inaccessible_npx.png)

Solution :

![L'attribut path variable de la configuration UUV](@site/static/img/docs/jetbrain-plugin/error/solution_path_inaccessible.png)
