
/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const common = require('./webpack.common');

const config = (env) => merge(common(env), {
  mode: 'production',
  output: {
    filename: 'server.js',
  },
  entry: {
    server: './index.js',
  },
});

module.exports = (env) => [config({ ...env, modern: true, target: 'node' }), config({ ...env, target: 'node' })];
