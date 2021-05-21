/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const common = require('./webpack.common');

const config = (env) => merge(common(env), {
  mode: 'development',
  devtool: 'inline-source-map',
});

module.exports = (env) => config({
  entry: {
    server: './index.js',
  },
  target: 'node',
  ...env,
});
