// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import("@docusaurus/types").Config} */
const config = {
  title: "UUV",
  tagline: "Discovering your application by usecase validation",
  favicon: "img/uuv.png",

  // Set the production url of your site here
  url: "https://orange-opensource.github.io/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/uuv/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  projectName: "docusaurus", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["fr", "en"]
  },

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import("@docusaurus/preset-classic").Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: ({ docPath }) => {
            return `https://holocron.so/github/pr/Orange-OpenSource/uuv/main/editor/packages/docs/docs/${docPath}`
          },
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: ({ docPath }) => {
            return `https://holocron.so/github/pr/Orange-OpenSource/uuv/main/editor/packages/docs/docs/${docPath}`
          },
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css")
        }
      })
    ]
  ],

  themeConfig:
  /** @type {import("@docusaurus/preset-classic").ThemeConfig} */
    ({
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "UUV",
        logo: {
          alt: "UUV",
          src: "img/uuv.png"
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Docs"
          },
          {
            href: "https://github.com/Orange-OpenSource/uuv/issues",
            label: "Issues",
            position: "right"
          },
          {
            type: "localeDropdown",
            position: "right"
          }
        ]
      },
      metadata: [{
        name: "keywords", content: "uuv, UUV, E2E, end-to-end, test, testing, " +
          "cypress, testing-library, accessibility, accessibilite, a11y, cucumber, " +
          "gherkin"
      }],
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Docs",
                to: "/docs/intro"
              }
            ]
          },
          {
            title: "Authors",
            items: [
              {
                label: "Louis Fredice NJAKO MOLOM",
                href: "https://github.com/luifr10"
              },
              {
                label: "Stanley SERVICAL",
                href: "https://github.com/stanlee974"
              }
            ]
          }
        ]
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme
      },
      colorMode: {
        defaultMode: "dark"
      }
    }),
  plugins: [
    [
      require.resolve("@cmfcmf/docusaurus-search-local"),
      {
        indexDocs: true,
        language: "fr",
        maxSearchResults: 8
      }
    ]
  ]
};

module.exports = config;
