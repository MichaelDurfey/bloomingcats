/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common');

module.exports = (env) => merge(common(env), {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
