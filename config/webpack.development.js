/* eslint-disable import/no-extraneous-dependencies */
/* global module */
/* global require */

const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const commonConfig = require('./base.js');

const rootDir = path.resolve(__dirname, '..');

module.exports = (env) => {
  const hotReplacementEntries = [
    'react-hot-loader/patch',
    `${require.resolve('webpack-dev-server/client')}?https://localhost:8080`,
    `${require.resolve('webpack/hot/only-dev-server')}`,
  ];
  return webpackMerge(commonConfig(), {
    devtool: 'eval',
    entry: [...hotReplacementEntries],
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['es2015', { modules: false }],
                  'react',
                  'stage-1',
                  'flow',
                ],
                plugins: ['transform-decorators-legacy'],
              },
            },
            { loader: 'react-hot-loader/webpack' },
            { loader: 'source-map-loader', options: { enforce: 'pre' } },
          ],
          include: [
            path.resolve(rootDir, 'src'),
          ],

          exclude: [/node_modules/],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(env.mode),
          BUGSNAG_API_KEY: JSON.stringify(env.bugsnagKey),
        },
      }),
    ],
  });
};
