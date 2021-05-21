import fetch from 'cross-fetch';
import { Home, Game, Rules } from '../client/components';

export default [
  {
    exact: true,
    path: '/',
    component: Home,
  },
  {
    path: '/game',
    component: Game,
    loadData: () => fetch('https://kittenpopserv.herokuapp.com/leaders')
      .then((response) => response.json())
      .then((leaders) => ({ leaders }))
      .catch((err) => console.error(err)),
  },
  {
    path: '/rules',
    component: Rules,
  },
  {
    path: '*',
    component: () => 404,
  },
];
