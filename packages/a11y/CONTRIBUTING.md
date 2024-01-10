# Contributors guide

First, read the general [CONTRIBUTING](../../CONTRIBUTING.md) file

## How Contribue to @uuv/a11y ?
This [page](./STRUCTURE.md) gives you an overview of the @uuv/a11y module structure.

### Add new RGAA rules
1. Identify the file concerned by the new rule you want to add <br>
For example :
   - a rule on test **1**.1.4 will concern the file `a11y/src/lib/reference/rgaa/rules/1-image.ts`
   - a rule on test **7**.1.1 will concern the file `a11y/src/lib/reference/rgaa/rules/7-script.ts`
2. Make sure the rule doesn't already exist in the file
3. Add your rule to the file, a rule can be :
   - `Auto` : it can be checked automatically, then you can follow the example below :
       ```typescript
       AutoCheckA11yRule.from({
            reference: "RGAA",
            criterion: "1.1",
            id: "1.1.5",
           elementType: "svg",
           query: new ByTagQuery([
               "svg:not([role=img])"
           ]),
           description: "svg has no image role",
           help: "set image role to svg"
        })
        ```
   - `Manual` : It must be checked manually by a human, then you can follow the example below :
       ```typescript
       ManualCheckA11yRule.from({
            reference: "RGAA",
            criterion: "1.3",
            wcag: "4.1.2 A",
            id: "1.3.1",
            elementType: "image",
            query: new ByTagQuery(informativeContent.image.buildSelectorWithAttributes()),
            attributes: informativeContent.image.ATTRIBUTES,
            description: "if present, attributes alt, title, aria-label, aria-labelledby must be relevant",
            help: "adapt these attributes to be relevant"
       })
        ```
   **Adding a new rule may require you to create a new query, in which case remember to write the corresponding automated tests in the `a11y/test/query/**` directory.**


4. Create or enhance the automated topic test file in the directory `a11y/test/checker/**`.
