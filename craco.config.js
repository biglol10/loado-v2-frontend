const CracoAlias = require('craco-alias');
const _ = require('lodash');
const webpack = require('webpack');

const isEnvDevelopment = process.env.REACT_APP_MODE === 'development';

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

    nodeEnv: false, // string | boolean

    portableRecords: false,

    providedExports: true,

    usedExports: true,

    removeAvailableModules: false,

    removeEmptyChunks: true,

    runtimeChunk: 'single', // object | string | boolean

    sideEffects: true,

    minimize: true,
  };

  webpackConfig.optimization = _.merge(webpackConfig.optimization, optimization);

  return webpackConfig;
};

const getConfig = (webpackConfig, paths) => {
  if (isEnvDevelopment) {
    return getConfigDevelopment(webpackConfig);
  }
  return webpackConfig;
};

module.exports = {
  // webpack: {
  //   plugins: [
  //     new webpack.DefinePlugin({
  //       'process.env': {
  //         CUSTOM_ENV_VAR: JSON.stringify(API_URL), // JSON.stringify로, 다만 얘를 쓰면 기존거가 다 사라져서 그냥 세팅되어 있는거 씀
  //       },
  //     }),
  //   ],
  // },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        tsConfigPath: 'tsconfig.paths.json',
      },
    },
  ],
  entry: {
    main: './src/index.tsx',
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
      // 일치하는 하나의 규칙만 사용
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
  devtool: isEnvDevelopment ? 'source-map' : false, // enum, 위 링크 참조
};
