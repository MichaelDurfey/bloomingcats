import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import serialize from 'serialize-javascript';
import { HelmetProvider } from 'react-helmet-async';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import path from 'path';
import { matchesUA } from 'browserslist-useragent';
import { Main } from '../client/components';


const modernStats = path.resolve('./dist/loadable-stats.esm.json');
const legacyStats = path.resolve('./dist/loadable-stats.cjs.json');

export default (req, data, context) => {
  const helmetContext = {};
  const modernExtractor = new ChunkExtractor({ statsFile: modernStats, entrypoints: 'app' });
  const legacyExtractor = new ChunkExtractor({ statsFile: legacyStats, entrypoints: 'app' });
  const commonExtractor = {
    addChunk(chunk) {
      modernExtractor.addChunk(chunk);
      legacyExtractor.addChunk(chunk);
    },
  };
  const html = renderToString(
    <StaticRouter location={req.path} context={context}>
      <HelmetProvider context={helmetContext}>
        <ChunkExtractorManager extractor={commonExtractor}>
          <Main />
        </ChunkExtractorManager>
      </HelmetProvider>
    </StaticRouter>,
  );

  const userAgent = req.get('User-Agent') || req.headers['user-agent'];
  let isProblemBrowser;
  try {
    isProblemBrowser = matchesUA(userAgent, {
      browsers: [
        'ie > 1',
        'Safari <= 10.1',
        'ios_saf < 10.2',
        'Chrome < 61',
        'firefox < 60',
        'Edge < 16',
        'Samsung < 8.2',
      ],
    });
  } catch {
    isProblemBrowser = false;
  }

  const modernScriptTags = modernExtractor.getScriptTags({ type: 'module', async: '' });
  const legacyScriptTags = legacyExtractor.getScriptTags({ nomodule: '', defer: '', crossorigin: '' });
  const moduleNoModuleScripts = `${modernScriptTags}${legacyScriptTags}`;

  const { helmet } = helmetContext;
  return modernExtractor.getCssString().then((css) => `
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
        ${isProblemBrowser ? legacyScriptTags : moduleNoModuleScripts}
      </body>
    </html>
  `);
};
