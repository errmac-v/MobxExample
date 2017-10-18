/* eslint-disable import/no-extraneous-dependencies */
/* global module */
/* global __dirname */
/* global require  */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpack = require('html-webpack-plugin');
const WebpackManifest = require('webpack-manifest-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const devServer = require('./server/dev-server');

const rootDir = path.resolve(__dirname, '..');
const outputPath = '../dist';

// noinspection JSUnresolvedFunction
module.exports = () =>
  ({
    entry: [
      'babel-polyfill',
      path.resolve(rootDir, 'src', 'App.jsx'),
      path.resolve(rootDir, 'src', 'App.css'),
    ],
    output: {
      path: path.resolve(__dirname, outputPath),
      filename: '[name].bundle.[hash].js',
      sourceMapFilename: '[name].[hash].map',
    },
    resolve: {
      extensions: ['.jsx', '.js', '.json', '.css'],
      modules: [path.join(rootDir, 'src'), 'node_modules'],
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextWebpackPlugin.extract({
            fallback: {
              loader: 'style-loader',
              options: {
                insertAt: 'top',
                minimize: true,
              },
            },
            use: [
              {
                loader: 'css-loader',
                options: {
                  importantLoaders: 1,
                  minimize: true,
                  modules: true,
                  localIdentName: '[name]__[local]__[hash:base64:5]',
                },
              },
              { loader: 'postcss-loader' },
            ],
          }),
        },
        {
          test: /\.(json|geojson)$/,
          use: 'json-loader',
        },
        {
          test: /\.(jpg|png|gif)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[hash].[ext]',
            },
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|svg)$/,
          use: {
            loader: 'file-loader',
            options: {
              limit: 100000,
              name: 'fonts/[name]/[name].[hash].[ext]',
            },
          },
        },
      ],
    },
    plugins: [
      new ExtractTextWebpackPlugin({
        filename: getPath => getPath('[name].css').replace('css/js', 'css'),
        allChunks: true,
        disable: process.env.NODE_ENV === 'development',
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new HtmlWebpack({
        filename: 'index.html',
        inject: 'body',
        template: path.resolve(rootDir, 'src', 'index.html'),
      }),
      new ScriptExtHtmlWebpackPlugin({
        defaultAttribute: 'defer',
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'main',
        minChunks: Infinity,
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: m => /node_modules/.test(m.context),
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'lodash',
        minChunks: m => /node_modules\/(?:lodash.indexby)/.test(m.context),
      }),
      new WebpackManifest({
        filename: 'chunk-manifest.json',
        manifestVariable: 'webpackManifest',
      }),
      new WebpackChunkHash(),
    ],
    devServer,
  });
