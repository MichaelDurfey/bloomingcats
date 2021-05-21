/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const babelPublicConfig = require('./babelPublicConfig');

module.exports = (env = {}) => ({
  entry: {
    ...env.entry,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: env.target === 'node' ? 'server.js' : '[name].js',
  },
  target: env.target,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader', ...(env.target === 'web' && { options: { ...babelPublicConfig } }) },
      },
      {
        test: /\.(png|jpe?g|gif|webp|mp3)$/i,
        loader: 'file-loader',
        options: {
          outputPath: 'assets',
          name: '[name].[ext]',
        },
      },
      {
        test: /\.css$/,
        oneOf: [
          {
            resourceQuery: /^\?raw$/,
            use: [
              MiniCssExtractPlugin.loader, 'css-loader',
            ],
          }, {
            use: [MiniCssExtractPlugin.loader, {
              loader: 'css-loader',
              options: {
                modules: true,
              },
            }],
          },
        ],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  plugins: [
    env.analyze && new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin(),
    env.target === 'web' && new LoadablePlugin(),
  ].filter(Boolean),
  devtool: 'cheap-eval-source-map',
});
