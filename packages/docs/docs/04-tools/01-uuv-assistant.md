import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# UUV Assistant

## Screenshots

![Assistant screenshots](@site/static/img/assistant/screenshots.gif)

## Online demo

<a href="https://uuv-assistant.vercel.app/">
    The online demo is available here.
</a>

## Install
:::caution

Npm/Yarn will need access to the internet when installing the Wizard library.

:::

Run the following command :

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

## Usage

```shell
npx uuv-assistant --targetUrl=<targetUrl>

```

| Name        | Description                                                                                                   | Example                               |
|-------------|---------------------------------------------------------------------------------------------------------------|---------------------------------------|
| `targetUrl` | Target website url                                                                                            | https://e2e-test-quest.github.io/uuv/ |


    

