import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Header from '../Header';
import Footer from '../Footer';
import Home from '../Home';
import Game from '../Game';
import Rules from '../Rules';
import styles from '../../styles/Main.css';

const FourOhFour = () => 404;

export default function Main() {
  console.log();
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
