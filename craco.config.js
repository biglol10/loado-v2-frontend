const CracoAlias = require('craco-alias');
const _ = require('lodash');
const TerserPlugin = require('terser-webpack-plugin');

const isEnvDevelopment = process.env.REACT_APP_MODE === 'development';
const isEnvProduction = process.env.REACT_APP_MODE === 'production';

const getConfigDevelopment = (webpackConfig) => {
  const external = {
    react: 'React',
    'react-dom': 'ReactDOM',
  };

  webpackConfig.externals = _.merge(webpackConfig.externals, external);
  const optimization = {
    chunkIds: false,
    moduleIds: false,
    concatenateModules: true,
    flagIncludedChunks: true,
    mergeDuplicateChunks: true,
    nodeEnv: false,
    portableRecords: false,
    providedExports: true,
    usedExports: true,
    removeAvailableModules: false,
    removeEmptyChunks: true,
    runtimeChunk: 'single',
    sideEffects: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.uglifyJsMinify,
        test: /\.(ts|tsx)$/,
        exclude: /\/excludes/,
        parallel: true,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  };

  webpackConfig.optimization = _.merge(webpackConfig.optimization, optimization);

  return webpackConfig;
};

const getConfigProduction = (webpackConfig) => {
  const external = {
    react: 'React',
    'react-dom': 'ReactDOM',
  };

  webpackConfig.externals = _.merge(webpackConfig.externals, external);
  const optimization = {
    chunkIds: false,
    moduleIds: false,
    concatenateModules: true,
    flagIncludedChunks: true,
    mergeDuplicateChunks: true,
    nodeEnv: 'production',
    portableRecords: false,
    providedExports: true,
    usedExports: true,
    removeAvailableModules: false,
    removeEmptyChunks: true,
    runtimeChunk: 'single',
    sideEffects: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        minify: TerserPlugin.uglifyJsMinify,
        test: /\.(ts|tsx)$/,
        exclude: /\/excludes/,
        parallel: true,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  };

  webpackConfig.optimization = _.merge(webpackConfig.optimization, optimization);

  return webpackConfig;
};

const getConfig = (webpackConfig, paths) => {
  if (isEnvDevelopment) {
    return getConfigDevelopment(webpackConfig);
  } else if (isEnvProduction) {
    return getConfigProduction(webpackConfig);
  }
  return webpackConfig;
};

const apiProxyTarget = 'https://developer-lostark.game.onstove.com';

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        tsConfigPath: 'tsconfig.paths.json',
      },
    },
  ],
  devServer: {
    port: 8000,
    // proxy: [
    //   {
    //     context: ['/api'],
    //     target: 'http://localhost:3066/',
    //     secure: false,
    //     changeOrigin: true,
    //   },
    // ],
    proxy: [
      {
        context: ['/lostark/markets'],
        target: apiProxyTarget,
        changeOrigin: true,
        pathRewrite: { '^/lostark/*': '' },
      },
      {
        context: ['/lostark/auctions'],
        target: apiProxyTarget,
        changeOrigin: true,
        pathRewrite: { '^/lostark/*': '' },
      },
      {
        context: ['/api'],
        target: 'http://localhost:8080',
      },
    ],
  },
  module: {
    rules: [
      {
        loader: require.resolve('file-loader'),
        exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        oneOf: [
          {
            test: /\.(png|jpg|gif)$/,
            use: ['file-loader'],
          },
          {
            test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            use: ['file-loader'],
          },
        ],
      },
    ],
  },
  configure: (webpackConfig, { paths }) => {
    return getConfig(webpackConfig, paths);
  },
  target: 'web',
  devtool: isEnvDevelopment ? 'source-map' : false,
};
