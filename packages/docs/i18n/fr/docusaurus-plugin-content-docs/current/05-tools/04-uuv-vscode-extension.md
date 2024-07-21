# UUV VS Code Extension

Cette extension vous permet d'écrire et d'exécuter vos tests UUV E2E à partir de Visual Studio Code.

## Installer l'extension
- Télécharger l'extension [UUV E2E Tests](https://marketplace.visualstudio.com/items?itemName=e2e-test-quest.uuv-vscode-extension)
- Ou rechercher **"UUV"** depuis l'onglet Extension, puis cliquer sur le bouton `installer`.

### Executer **uuv open**
Ouvrir le runner : rechercher la commande vscode `UUV Open`.<br/>
![UUV Open](https://github.com/Orange-OpenSource/uuv/raw/HEAD/packages/vscode-extension/docs/images/uuv-open.png)

### Executer **uuv e2e**
Depuis la `vue Testing`, vous pouvez voir et exécuter vos tests uuv.<br/>
![UUV E2E](https://github.com/Orange-OpenSource/uuv/raw/HEAD/packages/vscode-extension/docs/images/uuv-e2e.png)

### Executer **uuv assistant**
[@uuv/assistant](https://orange-opensource.github.io/uuv/docs/tools/uuv-assistant) est un composant qui vous aide à générer les phrases avec une approche user-centric pour vous scénario de test.<br/>
Ouvrir l'assistant uuv : rechercher la commande vscode `UUV Open`.<br/>
![UUV Assistant](https://github.com/Orange-OpenSource/uuv/raw/HEAD/packages//vscode-extension/docs/images/uuv-assistant.png)

## Paramètres de l'extension

| Parametre             | Obligatoire | Valeur par défaut | Description                                                                                |
|-----------------------|-------------|-------------------|--------------------------------------------------------------------------------------------|
| uuv.projectHomeDir    | Oui         | `.`               | Doit être le répertoire contenant le package.json où la dépendance uuv est installée       |
| uuv.useLocalScript    | Non         |                   | Cochez cette case si, pour une raison quelconque, vous ne pouvez pas exécuter les **scripts npx** à partir de votre ordinateur.      |
