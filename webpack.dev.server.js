/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const common = require('./webpack.common');

const config = (env) => merge(common(env), {
  entry: {
    server: './index.js',
  },
  output: {
    filename: 'server.js',
  },
  mode: 'development',
  devtool: 'inline-source-map',
});

module.exports = (env) => [config({ ...env, modern: true, target: 'node' }), config({ ...env, target: 'node' })];
