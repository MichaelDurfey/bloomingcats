import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import loadable from '@loadable/component';
import styles from '../../styles/Main.css';

const Header = loadable(() => import('../Header'));
const Footer = loadable(() => import('../Footer'));
const Home = loadable(() => import('../Home'));
const Game = loadable(() => import('../Game'));
const Rules = loadable(() => import('../Rules'));

const FourOhFour = () => 404;

export default function Main() {
  return (
    <>
      <Header />
      <Container as="main" fluid className={styles.main}>
        <Row lg>
          <Col>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/game" component={Game} />
              <Route path="/rules" component={Rules} />
              <Route component={FourOhFour} />
            </Switch>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
