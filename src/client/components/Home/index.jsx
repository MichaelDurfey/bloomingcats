import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import styles from '../../styles/Home.css';
import { randomCat } from '../Game/BoardContext';

export default function Home() {
  return (
    <section>
      <Container>
        <Row>
          <Col className={styles.container}>
            <div className={styles.text}>
              <h1>
                Welcome to Kitten Pop!
              </h1>
              <p>Kitten Pop is a fun game with cats. Try to score as many points as you can before the board is overrun with cats. Score points by arranging 5 or more cats in a row or diagonal in any direction. Watch out though, because there must be a clear path to the square to place a cat.</p>
              <br />
              <Button variant="danger" href="/game">Start!</Button>
              <img alt="" className={styles.image} src={randomCat().img} />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
