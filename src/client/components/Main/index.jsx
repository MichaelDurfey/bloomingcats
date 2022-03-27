import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Header from '../Header';
import Footer from '../Footer';
import Home from '../Home';
import Game from '../Game';
import Rules from '../Rules';
import styles from '../../styles/Main.css';
import LeaderBoard from '../LeaderBoard';

const FourOhFour = () => 404;

export default function Main() {
  return (
    <>
      <Header />
      <Container as="main" fluid className={styles.main}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/game" component={Game} />
          <Route path="/rules" component={Rules} />
          <Route path="/leaderboard" component={LeaderBoard} />
          <Route component={FourOhFour} />
        </Switch>
      </Container>
      <Footer />
    </>
  );
}
