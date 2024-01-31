# Migrations of 2.x.x minor or patch

## Rationalize list sentences
For `@uuv/cypress 2.6.0 -> 2.7.0` and `@uuv/playwright 2.5.0 -> 2.6.0`
- The following sentences have been removed:
  - `I should see a list named {string} and containing {string} disabled`
  - `I should see a list named {string} and containing {string} enabled`
- The sentence `I should see elements of the list with name {string}` has been transformed into `I should see a list named {string} and containing`
