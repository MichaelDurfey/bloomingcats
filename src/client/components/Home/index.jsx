import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '../../styles/Home.css';
import brownCat from '../../../assets/1BrownCat.png';

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
              <img alt="" className={styles.image} src={brownCat} />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
