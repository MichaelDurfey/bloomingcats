const express = require('express');
const routes = require('./src/server/router');

const app = express();

app.use(express.static('dist'));
app.use('/', routes);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('listening on port 3000!');
});
