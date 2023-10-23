# FAQ

WIP

### Why is it better to use accessible attributes to look for elements in the DOM?

### Cannot run the tests normally ?

<Tabs>
<TabItem value="cypress" label="Cypress">

:::info
This step is only necessary if you have chosen the `Cypress` runner and you cannot [run the tests normally](/docs/test/running-test).
:::
Edit the `package.json` file to add the following line in the script section :

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

:::info
This step is only necessary if you have chosen the `Playwright` runner and you cannot [run the tests normally](/docs/test/running-test).
:::
Edit the `package.json` file to add the following line in the script section :

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

### Cannot run tests with jetbrains-plugin

#### Case 1 : Open or Run command is null
Target script attribute is automatically deleted sometimes. you must fill the field **Target Script attribute** of UUV run/debug configuration with open or e2e ([bug traced](https://github.com/Orange-OpenSource/uuv/issues/305 "Opening in new tab bug 305 of Orange OpenSource/uuv")).

Message :

![open or e2e command is null](@site/static/img/docs/jetbrain-plugin/error/error_command_open_or_e2e.png)

Solution :

![target script of UUV configuration](@site/static/img/docs/jetbrain-plugin/error/solution_open_e2e_command.png)

#### Case 2 : npm command is not found
On MacOs, environment variable named PATH is inaccessible. You must fill **path variable attribute with npm and node executable** in the parameter Environment variables of UUV run/debug configuration

Message :

![error message](@site/static/img/docs/jetbrain-plugin/error/error_path_inaccessible_npm.png)

Solution :

![target script of UUV configuration](@site/static/img/docs/jetbrain-plugin/error/solution_path_inaccessible.png)

#### Case 2 : npx command is not found
On MacOs, environment variable named PATH is inaccessible. You must fill **path variable attribute with npx and node executable** in the parameter Environment variables of UUV run/debug configuration

Message :

![Open or Run command is null](@site/static/img/docs/jetbrain-plugin/error/error_path_inaccessible_npx.png)

Solution :

![target script of UUV configuration](@site/static/img/docs/jetbrain-plugin/error/solution_path_inaccessible.png)
