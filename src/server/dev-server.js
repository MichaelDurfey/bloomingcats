/* eslint-disable import/no-extraneous-dependencies */
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const config = require('../../webpack.dev.js');

const options = {
  contentBase: '../../dist',
  hot: true,
  host: 'localhost',
  writeToDisk: true,
  proxy: {
    '/': 'http://localhost:3000',
  },
};

WebpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config({ env: 'node' }));
const server = new WebpackDevServer(compiler, options);

server.listen(5000, 'localhost', () => {
  // eslint-disable-next-line no-console
  console.log('dev server listening on port 5000');
});
