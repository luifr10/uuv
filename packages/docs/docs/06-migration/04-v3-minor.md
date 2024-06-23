# Migrations of 3.x.x minor or patch

## Change default browser for @uuv/playwright
For `@uuv/playwright 3.0.1 -> 3.0.2`
- Rename browser name in `uuv/playwright.config.ts`:
  - `name: "Microsoft Edge"` -> `name: "edge"`
  - `name: "Google Chrome"` -> `name: "chrome"`
