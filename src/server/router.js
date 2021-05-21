const express = require('express');
// const path = require('path');
const { matchPath } = require('react-router-dom');
const routes = require('../common/routes').default;
const renderer = require('./renderer').default;

const router = express.Router();

router
  .get('*', (req, res) => {
    const promises = [];
    routes.some((route) => {
      // use `matchPath` here
      const match = matchPath(req.path, route);
      if (match && route.loadData) promises.push(route.loadData(match));
      return match;
    });

    Promise.all(promises).then(async (data) => {
      const context = {};
      const content = await renderer(req, data, context);

      if (context.url) {
        return res.redirect(301, context.url);
      }
      if (context.notFound) {
        return res.status(404);
      }
      return res.send(content);
    });
  });

module.exports = router;
