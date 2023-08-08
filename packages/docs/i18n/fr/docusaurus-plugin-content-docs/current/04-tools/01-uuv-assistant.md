import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# UUV Assistant

## Screenshots

![Assistant screenshots](@site/static/img/assistant/screenshots.gif)

## Démo en ligne

<a href="https://uuv-assistant.vercel.app/">
    La démo en ligne est disponible ici.
</a>

## Installation
### Paquet NPM
Lancer la commande suivante :

<Tabs>
<TabItem value="npm" label="Npm">

```shell
npm install --save-dev @uuv/assistant
```

</TabItem>
<TabItem value="Yarn" label="Yarn">

```shell
yarn add -D @uuv/assistant
```

</TabItem>
</Tabs>

### Desktop executable
1. Télécharger l'exécutable à l'aide du bouton suivant :

   <a href="https://github.com/Orange-OpenSource/uuv/releases/latest/download/uuv-assistant-win32-x64.zip"><img src="https://img.shields.io/badge/Téléchager_uuv--assistant_desktop-black?&style=for-the-badge&logo=github&logoColor=white" alt="documentation"/></a>
2. Décompresser le fichier zip

## Lancement
### Paquet NPM
```shell
npx uuv-assistant --targetUrl=<url cible>
```

| Nom                  | Description                                                                                                   | Exemple                               |
|----------------------|---------------------------------------------------------------------------------------------------------------|---------------------------------------|
| `targetUrl`          | Target website url                                                                                            | https://orange-opensource.github.io/uuv/ |

### Desktop executable
Exécuter le fichier `uuv-assistant.exe` depuis le dossier décompressé


