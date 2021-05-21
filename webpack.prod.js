/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');

const config = (env) => merge(common(env), {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
  },
});

module.exports = (env) => [config({
  entry: {
    server: './server/',
  },
  target: 'node',
  ...env,
}), config({
  entry: {
    app: './src/client/App.jsx',
  },
  target: 'web',
  ...env,
})];
