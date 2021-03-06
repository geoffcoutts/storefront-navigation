# StoreFront navigation

StoreFront `<gb-navigation>` component

[![npm (scoped with tag)](https://img.shields.io/npm/v/@storefront/navigation.svg?style=flat-square)](https://www.npmjs.com/package/@storefront/navigation)
[![CircleCI branch](https://img.shields.io/circleci/project/github/groupby/storefront-navigation/master.svg?style=flat-square)](https://circleci.com/gh/groupby/storefront-navigation/tree/master)
[![Codecov branch](https://img.shields.io/codecov/c/github/groupby/storefront-navigation/master.svg?style=flat-square)](https://codecov.io/gh/groupby/storefront-navigation)
[![bitHound](https://img.shields.io/bithound/code/github/groupby/storefront-navigation.svg?style=flat-square)](https://www.bithound.io/github/groupby/storefront-navigation)
[![bitHound](https://img.shields.io/bithound/dependencies/github/groupby/storefront-navigation.svg?style=flat-square)](https://www.bithound.io/github/groupby/storefront-navigation)

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![Greenkeeper badge](https://badges.greenkeeper.io/groupby/storefront-navigation.svg)](https://greenkeeper.io/)

[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://choosealicense.com/licenses/mit/)
[![API Reference](https://img.shields.io/badge/API_reference-latest-blue.svg?style=flat-square)](https://groupby.github.io/storefront-navigation/)

## Getting Started

This module requires [`@storefront/core`](https://www.npmjs.com/package/@storefront/core) for the component to render
and receive data from GroupBy microservices.

### Prerequisites

This module is meant to be used in a `node` environment which is bundled for use in the browser.

### Installing

Use `npm` or `yarn` to install in a `node` project that uses `webpack`, `browserify` or similar.

```sh
npm install --save @storefront/navigation
# or
yarn add @storefront/navigation
```

## Usage

This module provides the `<gb-navigation>` component for use with StoreFront.

### Mount tag

```html
<!-- index.html -->
<body>
  <gb-navigation></gb-navigation>
</body>
```

```js
// index.js
storefront.mount('gb-navigation');
```

## Running the tests

Tests can be run to generate coverage information.
Once run, open `coverage/index.html` in your browser to view coverage breakdown.

```sh
npm start coverage
# or
yarn start coverage
```

Tests can be run continuously for development

```sh
npm run tdd
# or
yarn tdd
```

Tests can also be run alone

```sh
npm test
# or
yarn test
```
