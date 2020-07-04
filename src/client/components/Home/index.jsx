import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
              <img alt="" className={styles.image} src={randomCat().img} />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
