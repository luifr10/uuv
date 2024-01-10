# Structure of the source

The a11y sources are mainly located in the `packages/a11y/src/lib` directory :

| Directory   | Description                                                                                                                                                                                                                                         |
|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `engine`    | Represents execution engine                                                                                                                                                                                                                         |
| `model`     | Contains classes and interfaces to describe rules and results                                                                                                                                                                                       |
| `query`     | A query is a component used to retrieve dom elements according to certain criteria.<br> Exemple : <br> - `by-role.query` : retrieve dom nodes based on their accessible role<br> - `by-tag.query` : retrieve dom nodes based on their html tag name |
| `reference` | Contains declarations of accessibility standards supported by the `@uuv/a11y` solution, in particular RGAA                                                                                                                                          |
