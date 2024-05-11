# Migrations des 2.x.x mineurs ou patch

## Rationnalisation des phrases sur les listes
Pour `@uuv/cypress 2.6.0 -> 2.7.0` et `@uuv/playwright 2.5.0 -> 2.6.0`
- Les phrase suivantes ont été supprimées :
  - `je dois voir une liste nommée {string} et contenant {string} inactif`
  - `je dois voir une liste nommée {string} et contenant {string} actif`
- La phrase `je dois voir des elements de la liste ayant pour nom {string}` a été transformée en `Ije dois voir une liste nommée {string} et contenant`

## Mise à jour de la dépendance badeball-cypress-cucumber de v16 à v20
Pour `@uuv/cypress 2.18.0 -> 2.19.0`
- Déplacer le fichier`.cypress-cucumber-preprocessorrc.json` dans le dossier `uuv`
