/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common');

const config = (env) => merge(common(env), {
  mode: 'production',
  entry: {
    app: './src/client/App.jsx',
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: env.modern ? '[name].[hash].esm.js' : '[name].[hash].cjs.js',
  },
});

module.exports = (env) => [config({ ...env, modern: true, target: 'web' }), config({ ...env, target: 'web' })];
