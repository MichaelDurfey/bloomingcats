import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import serialize from 'serialize-javascript';
import { HelmetProvider } from 'react-helmet-async';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import path from 'path';
import { Main } from '../client/components';

const statsFile = path.resolve('./dist/loadable-stats.json');

export default (req, data, context) => {
  const helmetContext = {};
  const extractor = new ChunkExtractor({ statsFile, entrypoints: 'app' });

  const html = renderToString(
    <StaticRouter location={req.path} context={context}>
      <HelmetProvider context={helmetContext}>
        <ChunkExtractorManager extractor={extractor}>
          <Main />
        </ChunkExtractorManager>
      </HelmetProvider>
    </StaticRouter>,
  );

  const { helmet } = helmetContext;
  return extractor.getCssString().then((css) => `
    <html>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
      </head>
      <style>
      ${css}
      </style>
      <body>
        <div id="root">${html}</div>
        <script>
          window.INITIAL_STATE = ${serialize(data.reduce((acc, curr) => ({ ...acc, ...curr }), []))}
        </script>
        <script src="./app.js"></script>
      </body>
    </html>
  `);
};
