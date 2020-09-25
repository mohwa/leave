'use strict';
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const resolve = (...args) => path.resolve(__dirname, ...args);

const ROOT_PATH = resolve('.');
const OUTPUT_PATH = resolve('dist');
const PORT = 9999;

const { PHASE, ACTION } = process.env;
const isDev = PHASE === 'DEV';
const isDevServer = ACTION === 'DEV_SERVER';
const mode = isDev ? 'development' : 'production';
const libPath = resolve('lib', 'index.js');
const examplePath = resolve('example', 'index.js');

module.exports = {
  context: ROOT_PATH,
  target: 'web',
  mode,
  entry: {
    seogi: libPath,
    ...(isDevServer ? { index: examplePath } : {}),
  },
  output: {
    path: OUTPUT_PATH,
    publicPath: '/',
    filename: isDev ? '[name].js' : '[name].min.js',
  },
  devtool: 'eval-source-map',
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.jsx', '.json', 'css'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [libPath, examplePath],
      },
    ],
  },
  plugins: [...(isDevServer ? [new HtmlWebPackPlugin({ filename: 'index.html' })] : [])],
  devServer: {
    host: '0.0.0.0',
    port: PORT, // default port is 9999
    writeToDisk: true,
    hot: true,
    inline: true,
    // open: true,
    disableHostCheck: true,
    historyApiFallback: {
      index: 'index.html',
    },
  },
};