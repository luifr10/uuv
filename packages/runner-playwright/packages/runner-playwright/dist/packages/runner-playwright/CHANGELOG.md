## [1.8.2](https://github.com/Orange-OpenSource/uuv/compare/runner-playwright-v1.8.1...runner-playwright-v1.8.2) (2023-08-31)


### Bug Fixes

* **runner-playwright:** adapt color of skipped scenario in console, # 215 ([51d30c7](https://github.com/Orange-OpenSource/uuv/commit/51d30c7b827f39dacd7512aad6564d7bfbfefcbc))
* **runner-playwright:** remove skipped steps in counter of scenario skipped, # 215 ([f077f4c](https://github.com/Orange-OpenSource/uuv/commit/f077f4c93c72186f06c882174c9f4afe57b97545))

## [1.8.1](https://github.com/Orange-OpenSource/uuv/compare/runner-playwright-v1.8.0...runner-playwright-v1.8.1) (2023-08-25)

# [1.8.0](https://github.com/Orange-OpenSource/uuv/compare/runner-playwright-v1.7.3...runner-playwright-v1.8.0) (2023-08-22)


### Bug Fixes

* prototype pollution in lodash - cve-2019-10744, [#219](https://github.com/Orange-OpenSource/uuv/issues/219) ([4b16741](https://github.com/Orange-OpenSource/uuv/commit/4b16741d53f814958ad0ee6d761e82d92374e5e8))


### Features

* **runner-playwright:** add locationHint for testLocation via teamcity, [#195](https://github.com/Orange-OpenSource/uuv/issues/195) ([d44dd9a](https://github.com/Orange-OpenSource/uuv/commit/d44dd9ae13e662e623391d43552b28c54ea465f1))
* **runner-playwright:** add targetTestFile to run specific file, [#195](https://github.com/Orange-OpenSource/uuv/issues/195) ([5d58b1e](https://github.com/Orange-OpenSource/uuv/commit/5d58b1ea7d4bddbc1675ec8e15455a06278957ff))
* **runner-playwright:** add teamcity trace for IntelliJ Plugin, [#195](https://github.com/Orange-OpenSource/uuv/issues/195) ([0d6b775](https://github.com/Orange-OpenSource/uuv/commit/0d6b7752ab26ffc4eaf8fe6a70fa60210ee747e8))

## [1.7.3](https://github.com/Orange-OpenSource/uuv/compare/runner-playwright-v1.7.2...runner-playwright-v1.7.3) (2023-08-21)


### Bug Fixes

* **runner-playwright:** use exact match while calling getByLabel, closes [#205](https://github.com/Orange-OpenSource/uuv/issues/205) ([d499b41](https://github.com/Orange-OpenSource/uuv/commit/d499b4138c01d072c251822e42a3d1b16b3cd7bb))

## [1.7.2](https://github.com/Orange-OpenSource/uuv/compare/runner-playwright-v1.7.1...runner-playwright-v1.7.2) (2023-08-17)


### Bug Fixes

* accept cucumber Rule keyword when generate json from ndjson for … ([#207](https://github.com/Orange-OpenSource/uuv/issues/207)) ([05bc903](https://github.com/Orange-OpenSource/uuv/commit/05bc90342ea2f7149109b5a12e428b04237bf00b))
* **runner-cypress:** relocate cypress-real-events dependency into project package.json, [#213](https://github.com/Orange-OpenSource/uuv/issues/213) ([ffca8dd](https://github.com/Orange-OpenSource/uuv/commit/ffca8dd21d3858d0020f6bf1974437bbf38fe6c4))

## [1.7.1](https://github.com/Orange-OpenSource/uuv/compare/runner-playwright-v1.7.0...runner-playwright-v1.7.1) (2023-08-09)


### Bug Fixes

* **deps:** update dependency cypress to v12.17.3 ([35c812b](https://github.com/Orange-OpenSource/uuv/commit/35c812bdabd1a3a2d27e972d3bb5c9323497c449))

# [1.7.0](https://github.com/Orange-OpenSource/uuv/compare/runner-playwright-v1.6.1...runner-playwright-v1.7.0) (2023-07-31)


### Bug Fixes

* correct link markdown not formated, [#164](https://github.com/Orange-OpenSource/uuv/issues/164) ([470e6b6](https://github.com/Orange-OpenSource/uuv/commit/470e6b6b07ef43261d14b0e8986cac304daf29d8))


### Features

* add accessibility sentences, [#164](https://github.com/Orange-OpenSource/uuv/issues/164) ([e55b2c6](https://github.com/Orange-OpenSource/uuv/commit/e55b2c647bec100294794fe34dabe582d2561643))
* add accessibility tab and arrows, [#166](https://github.com/Orange-OpenSource/uuv/issues/166) ([9b926cd](https://github.com/Orange-OpenSource/uuv/commit/9b926cd322049860a5f06810027dbeb7efe6d795))
* use accessibility sentences on playwright, [#164](https://github.com/Orange-OpenSource/uuv/issues/164) ([b273e84](https://github.com/Orange-OpenSource/uuv/commit/b273e842a1a6b82f1a9c707187aa3d176b7fcabc))

## [1.6.1](https://github.com/Orange-OpenSource/uuv/compare/runner-playwright-v1.6.0...runner-playwright-v1.6.1) (2023-07-30)


### Bug Fixes

* **deps:** update dependency @cucumber/cucumber to v9.3.0 ([212250b](https://github.com/Orange-OpenSource/uuv/commit/212250be47e040e34de18af33986a1f26f7b00a2))
* **deps:** update dependency @cypress/webpack-preprocessor to v5.17.1 ([9570e56](https://github.com/Orange-OpenSource/uuv/commit/9570e5689387a2c770994576d779a34ff242ca76))
* **deps:** update dependency antd to v5.7.3 ([452fc3c](https://github.com/Orange-OpenSource/uuv/commit/452fc3c3861509e8aba46b3efa248f365bbfb747))
* **deps:** update dependency axe-core to v4.7.2 ([965b9dc](https://github.com/Orange-OpenSource/uuv/commit/965b9dcb1445c369c770ed056ab990e3f966197b))
* **deps:** update dependency cypress to v12.17.2 ([49a3012](https://github.com/Orange-OpenSource/uuv/commit/49a3012f7ebf0e6ecc879d21ff86147938967607))
* **deps:** update dependency nanoid to v3.3.6 ([82fa0c3](https://github.com/Orange-OpenSource/uuv/commit/82fa0c31207a9004a8b365fe0e92fcaac38e1be3))
* **deps:** update docusaurus monorepo to v2.4.1 ([9c0f5fb](https://github.com/Orange-OpenSource/uuv/commit/9c0f5fb6a641f54fc97d0940acfebdfb5106a790))

# [1.6.0](https://github.com/Orange-OpenSource/uuv/compare/runner-playwright-v1.5.0...runner-playwright-v1.6.0) (2023-07-18)


### Bug Fixes

* **runner-playwright:** replace encoded space character, fixes [#139](https://github.com/Orange-OpenSource/uuv/issues/139) ([6fbc533](https://github.com/Orange-OpenSource/uuv/commit/6fbc533a19abe7ed2ec6cd720709ce2bc3ee7283))


### Features

* add assistant-desktop to several docs, closes [#144](https://github.com/Orange-OpenSource/uuv/issues/144) ([61dd396](https://github.com/Orange-OpenSource/uuv/commit/61dd3961fb5b8ca40e72762baf7b326686171788))

# [1.6.0](https://github.com/Orange-OpenSource/uuv/compare/runner-playwright-v1.5.0...runner-playwright-v1.6.0) (2023-07-17)


### Bug Fixes

* **runner-playwright:** replace encoded space character, fixes [#139](https://github.com/Orange-OpenSource/uuv/issues/139) ([6fbc533](https://github.com/Orange-OpenSource/uuv/commit/6fbc533a19abe7ed2ec6cd720709ce2bc3ee7283))


### Features

* add assistant-desktop to several docs, closes [#144](https://github.com/Orange-OpenSource/uuv/issues/144) ([61dd396](https://github.com/Orange-OpenSource/uuv/commit/61dd3961fb5b8ca40e72762baf7b326686171788))

# [1.5.0](https://github.com/Orange-OpenSource/uuv/compare/runner-playwright-v1.4.3...runner-playwright-v1.5.0) (2023-07-02)


### Bug Fixes

* **assistant:** moving test app in component ([5bdc75b](https://github.com/Orange-OpenSource/uuv/commit/5bdc75b9ae4aec75f7a944513af0d57a4107cefd))


### Features

* **assistant:** setting up electron, fixes [#132](https://github.com/Orange-OpenSource/uuv/issues/132) ([6d6e99c](https://github.com/Orange-OpenSource/uuv/commit/6d6e99cbbdb498e1d5f24a0386e52ae38fa1b161))
* setup assistant-electron package, [#132](https://github.com/Orange-OpenSource/uuv/issues/132) ([76d69c2](https://github.com/Orange-OpenSource/uuv/commit/76d69c2b5d311b40cb42c9511d224d7911133e10))

## [1.4.3](https://github.com/Orange-OpenSource/uuv/compare/runner-playwright-v1.4.2...runner-playwright-v1.4.3) (2023-05-29)


### Bug Fixes

* fix playwright build, [#109](https://github.com/Orange-OpenSource/uuv/issues/109) ([c5ef9c9](https://github.com/Orange-OpenSource/uuv/commit/c5ef9c9185f228e35fcaa41363ebae6409a050c7))
* **runner-playwright:** add unsafe step_definitions for autocompletion, [#122](https://github.com/Orange-OpenSource/uuv/issues/122) ([b5dc1d0](https://github.com/Orange-OpenSource/uuv/commit/b5dc1d0063e506cc376f35d4f1fe1fc4c1d5ded0))
* **runner-playwright:** regenerate package-lock.json to fix lint, [#109](https://github.com/Orange-OpenSource/uuv/issues/109) ([70044df](https://github.com/Orange-OpenSource/uuv/commit/70044dfd9efb2c6776a85cadd18966610d2d61f2))

## [1.4.2](https://github.com/Orange-OpenSource/uuv/compare/runner-playwright-v1.4.1...runner-playwright-v1.4.2) (2023-05-19)


### Bug Fixes

* fix example url in readme, [#100](https://github.com/Orange-OpenSource/uuv/issues/100) ([c0609dc](https://github.com/Orange-OpenSource/uuv/commit/c0609dc6eee36e842e3dc74095a338d48b5248cc))

## [1.4.1](https://github.com/Orange-OpenSource/uuv/compare/runner-playwright-v1.4.0...runner-playwright-v1.4.1) (2023-05-19)


### Bug Fixes

* **assistant:** fix assistant css problem, [#120](https://github.com/Orange-OpenSource/uuv/issues/120) ([026d66a](https://github.com/Orange-OpenSource/uuv/commit/026d66ad6ad7e9090282f1734335c5a7b1e417c6))
* release 1.4.0 package.json and rchangelog was not updated, [#117](https://github.com/Orange-OpenSource/uuv/issues/117) ([cd7723d](https://github.com/Orange-OpenSource/uuv/commit/cd7723d6d790dd5fd928a5d9d41bfd075159378a))
* remove explicit plugin @semantic-release/git and just set commit message, [#117](https://github.com/Orange-OpenSource/uuv/issues/117) ([ac1f818](https://github.com/Orange-OpenSource/uuv/commit/ac1f8188cccbcb224acb15180cd0bd131aaa6cd1))

# [1.4.0](https://github.com/Orange-OpenSource/uuv/compare/runner-playwright-v1.3.3...runner-playwright-v1.4.0) (2023-05-16)

### Bug Fixes

* **runner-commons:** restructure documentation, [#112](https://github.com/Orange-OpenSource/uuv/issues/112) ([f5db612](https://github.com/Orange-OpenSource/uuv/commit/f5db612da3c31d2e6f4a3f647546167ebcbddaa5))
* **runner-playwright:** add benefit block [#112](https://github.com/Orange-OpenSource/uuv/issues/112) ([e037cc2](https://github.com/Orange-OpenSource/uuv/commit/e037cc24c14edc45093a1073598b3ea484d5e420))
* **runner-playwright:** restructure documentation, [#112](https://github.com/Orange-OpenSource/uuv/issues/112) ([954e2ac](https://github.com/Orange-OpenSource/uuv/commit/954e2ac13819f2cb97a13dbcdedb017db9cd4365))

### Features

* **runner-playwright:** add error details and screenshot to report, fixes [#110](https://github.com/Orange-OpenSource/uuv/issues/110) ([3c4a3cd](https://github.com/Orange-OpenSource/uuv/commit/3c4a3cd192b90242dd07bbdc4bb3ece780ee0c40))

## [1.3.3](https://github.com/Orange-OpenSource/uuv/compare/runner-playwright-v1.3.2...runner-playwright-v1.3.3) (2023-05-15)


### Bug Fixes

* **runner-playwright:** fix workspace lint during ci, [#108](https://github.com/Orange-OpenSource/uuv/issues/108) ([a3ac0d6](https://github.com/Orange-OpenSource/uuv/commit/a3ac0d68d27c34f36237b6f74b94e160b7cde9b8))

## [1.3.2](https://github.com/Orange-OpenSource/uuv/compare/runner-playwright-v1.3.1...runner-playwright-v1.3.2) (2023-05-11)


### Bug Fixes

* **runner-playwright:** add lint script [#8](https://github.com/Orange-OpenSource/uuv/issues/8) ([0cd7451](https://github.com/Orange-OpenSource/uuv/commit/0cd7451a2bb73698e05aefc6c89be01c2ea41c96))
* **runner-playwright:** update @cucumber/cucumber dep version, [#93](https://github.com/Orange-OpenSource/uuv/issues/93) ([a891a70](https://github.com/Orange-OpenSource/uuv/commit/a891a70daad1cb5d7d34f25097a31d89f92b92c6))

## [1.3.1](https://github.com/Orange-OpenSource/uuv/compare/runner-playwright-v1.3.0...runner-playwright-v1.3.1) (2023-05-09)


### Bug Fixes

* **runner-commons:** fix npm documentation, [#87](https://github.com/Orange-OpenSource/uuv/issues/87) ([ba7394c](https://github.com/Orange-OpenSource/uuv/commit/ba7394cd755e350fd5a5964aed26435e5979e77d))
* **runner-commons:** modify keyword for npmjs, [#87](https://github.com/Orange-OpenSource/uuv/issues/87) ([392c4d0](https://github.com/Orange-OpenSource/uuv/commit/392c4d0337179dae2c2a96c26dc2cc32e0ad87b3))
* **runner-playwright:** add `npx playwright install` into postinstall, [#87](https://github.com/Orange-OpenSource/uuv/issues/87) ([035f6aa](https://github.com/Orange-OpenSource/uuv/commit/035f6aabb7d654eb45b789e73d63f118b628f9af))
* **runner-playwright:** fix npm documentation, [#87](https://github.com/Orange-OpenSource/uuv/issues/87) ([716de44](https://github.com/Orange-OpenSource/uuv/commit/716de44456c50dcc4f52c3ed49f8fe48bf2f15b0))
* **runner-playwright:** modify doc for npmjs, [#87](https://github.com/Orange-OpenSource/uuv/issues/87) ([593e4ef](https://github.com/Orange-OpenSource/uuv/commit/593e4ef3d14df27b3770f17bac9ba9ba7f326f4a))

# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [1.2.0-beta-20230424] - 2023-04-24

### Added
- [#4](https://github.com/Orange-OpenSource/uuv/issues/4)
  MINOR Amélioration du scoring npm
- [#3](https://github.com/Orange-OpenSource/uuv/issues/3)
  MAJOR Initialisation du pipeline
- [#1](https://github.com/Orange-OpenSource/uuv/issues/1)
  MAJOR Rajout de la licence Apache 2.0
