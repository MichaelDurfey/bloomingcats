/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common');

const config = (env) => merge(common(env), {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    app: './src/client/App.jsx',
  },
  output: {
    filename: env.modern ? '[name].[hash].esm.js' : '[name].[hash].cjs.js',
  },
  plugins: [new webpack.HotModuleReplacementPlugin()].filter(Boolean),
});

module.exports = (env) => [config({ ...env, modern: true, target: 'web' }), config({ ...env, target: 'web' })];
