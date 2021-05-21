/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common');

const config = (env) => merge(common(env), {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [new webpack.HotModuleReplacementPlugin()].filter(Boolean),
});

module.exports = (env) => config({
  entry: {
    app: './src/client/App.jsx',
  },
  target: 'web',
  ...env,
});
