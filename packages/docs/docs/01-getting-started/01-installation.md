import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Installation

:::info
First of all you have to choose your runners among the following :
- [Cypress](#cypress)
- [Playwright](#playwright)

When your tests are written you can change the runner by replacing the npm dependency without having to modify them.
:::

## Cypress

:::caution

Npm/Yarn will need access to the internet when installing the Cypress library.

:::

Run the following command :

<Tabs>
<TabItem value="npm" label="Npm">

```shell
npm install --save-dev @uuv/cypress
```

</TabItem>
<TabItem value="Yarn" label="Yarn">

```shell
yarn add -D @uuv/cypress
```

</TabItem>
</Tabs>

## Playwright

:::caution

Npm/Yarn will need access to the internet when installing the Playwright library.

:::

Run the following command :

<Tabs>
<TabItem value="npm" label="Npm">

```shell
npm install --save-dev @uuv/playwright
```

</TabItem>
<TabItem value="Yarn" label="Yarn">

```shell
yarn add -D @uuv/playwright
```

</TabItem>
</Tabs>
