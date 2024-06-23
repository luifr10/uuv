# Migrations des 3.x.x mineurs ou patch

## Modification du navigateur par défaut pour @uuv/playwright
Pour `@uuv/playwright 3.0.1 -> 3.0.2`
- Renommer les noms de navigateurs dans le fichier `uuv/playwright.config.ts`:
  - `name: "Microsoft Edge"` -> `name: "edge"`
  - `name: "Google Chrome"` -> `name: "chrome"`
