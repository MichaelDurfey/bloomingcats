/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const NodeExternals = require('webpack-node-externals');
const babelPublicConfig = require('./babelPublicConfig');

module.exports = (env = {}) => ({
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          ...(env.target === 'web' && { options: { ...babelPublicConfig(env), babelrc: false } }),
        },
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
  target: env.target,
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  externals: env.target === 'node' ? [NodeExternals({ allowlist: ['react-bootstrap', 'bootstrap'] })] : [],
  plugins: [
    env.analyze && new BundleAnalyzerPlugin({ analyzerPort: env.modern ? 8000 : 8001 }),
    new MiniCssExtractPlugin(),
    env.target === 'web' && new LoadablePlugin({
      filename: env.modern ? 'loadable-stats.esm.json' : 'loadable-stats.cjs.json',
    }),
  ].filter(Boolean),
  optimization: {
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](core-js|react|react-dom|react-router.+|react-bootstrap.+)[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
});
