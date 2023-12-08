const CracoAlias = require('craco-alias');
const _ = require('lodash');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');

const isEnvDevelopment = process.env.REACT_APP_MODE === 'development';

const apiProxyTarget = 'https://developer-lostark.game.onstove.com';

module.exports = {
  webpack: {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: path.resolve(__dirname, 'bundleReport', 'report.html'), // npm run build && webpack-bundle-analyzer build/static/stats.json
        openAnalyzer: true,
      }),
    ],
  },
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
        target: 'http://localhost:8090',
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
    const optimization = {
      minimize: true, // Enable minimization
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true, // Drop console.* statements
            },
            output: {
              comments: false, // Remove comments
            },
          },
          extractComments: false, // Do not extract comments to separate files
        }),
      ],
      splitChunks: {
        chunks: 'all', // Split all chunks
      },
      runtimeChunk: {
        name: 'runtime', // Create a separate chunk for the runtime
      },
    };

    webpackConfig.optimization = _.merge(webpackConfig.optimization, optimization);
    return webpackConfig;
  },
  target: 'web',
  devtool: isEnvDevelopment ? 'source-map' : false,
};
