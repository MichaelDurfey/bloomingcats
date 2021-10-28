import React from 'react';
import { hydrate, render } from 'react-dom';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import Main from './components/Main';
// eslint-disable-next-line import/no-unresolved
import 'bootstrap/dist/css/bootstrap.min.css?raw';
import './styles/App.css';
import BoardContextProvider from './components/Game/BoardContext';

const Root = () => (
  <Router>
    <BoardContextProvider>
      <Main />
    </BoardContextProvider>
  </Router>
);

const renderMethod = module.hot ? render : hydrate;
renderMethod(<Root />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept((err) => {
    // eslint-disable-next-line no-console
    console.log('hmr error!', err);
  });
}
