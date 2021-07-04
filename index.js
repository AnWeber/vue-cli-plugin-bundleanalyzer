
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;


module.exports = (api, projectOptions) => {
  api.registerCommand('analyze', {
    description: 'analyze output with Webpack Bundle Analyzer',
    usage: 'vue-cli-service analyze'
  },
    async (args, rawArgs) => {
      const { build } = api.service.commands
      args.report = true;
      args["report-json"] = true;

      const mergedOptions = Object.assign({
        analyzerMode: 'server',
        openAnalyzer: true
      },
       (projectOptions.pluginOptions || {}).bundleAnalyzer || {},
       getArgsOptions(args)
      );
      if (args.verbose) {
        console.info(mergedOptions);
      }
      api.chainWebpack(webpackConfig => {
        webpackConfig
          .plugin("bundleAnalyzer")
          .use(BundleAnalyzerPlugin)
          .init(Plugin => new Plugin(mergedOptions));
      });
      return await build.fn(args, rawArgs);
    }
  );
}

function getArgsOptions(args) {
  const argsOptions = {
    analyzerMode: args.analyzerMode,
    analyzerHost: args.analyzerHost,
    analyzerPort: !!args.analyzerPort ? Number.parseInt(args.analyzerPort) : undefined,
    reportFilename: args.reportFilename,
    reportTitle: args.reportTitle,
    defaultSizes: args.defaultSizes,
    openAnalyzer: !!args.openAnalyzer ? args.openAnalyzer === 'true' : undefined,
    generateStatsFile: !!args.generateStatsFile ? args.generateStatsFile === 'true' : undefined,
    statsFilename: args.statsFilename,
    logLevel: args.logLevel,
  };
  for (const [key, value] of Object.entries(argsOptions)) {
    if (value === undefined) {
      delete argsOptions[key];
    }
  }
  return argsOptions;
}

module.exports.defaultModes = {
  analyze: 'production'
}