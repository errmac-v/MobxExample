/* eslint-disable import/no-extraneous-dependencies */
/* global module */
/* global require */
const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const BabiliPlugin = require('babili-webpack-plugin');
const path = require('path');

const commonConfig = require('./base.js');

const rootDir = path.resolve(__dirname, '..');

module.exports = env =>
  webpackMerge(commonConfig(), {
    devtool: 'source-map',
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
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),
      new BabiliPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(env.mode),
          BUGSNAG_API_KEY: JSON.stringify(env.bugsnagKey),
        },
      }),
    ],
  });
