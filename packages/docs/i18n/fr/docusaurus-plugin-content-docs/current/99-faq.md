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