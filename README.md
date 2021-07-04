# vue-cli-plugin-bundleanalyzer

adds separate analyze command in vue-cli-service which generates a Webpack Bundle Analyzer report.

```
vue-cli-service analyze
```

## Installation

`vue add bundleanalyzer`

## Options with vue.config.js

add a bundleanalyzer block to vue.config.js with [valid options](https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-plugin).

```js
module.exports = {
  pluginOptions: {
    bundleAnalyzer: {
      analyzerMode: 'static'
    }
  }
};
```

## Configuration with command args

add additional command args to inject specific [options](https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-plugin)

```
npx vue-cli-service analyze --openAnalyzer=false
```

or

```
npm run analyze -- --openAnalyzer=false
```

## Injected webpack-chain Rules

- `config.plugin('bundleAnalyzer')`
