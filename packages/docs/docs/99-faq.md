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
