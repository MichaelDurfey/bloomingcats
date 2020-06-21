import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { catImageMap, ruleImage1, ruleImage2 } from '../Game/images';


import styles from '../../styles/Rules.css';

export default function Rules() {
  return (
    <section className="main">
      <Container className={styles.container} fluid>
        <Row fluid>
          <Col fluid>
            <Jumbotron fluid className={styles.rulesJumbotron}>
              <h1>
                Rules
              </h1>
              <br />
              <section className={styles.rulesContainer}>
                <h2>
                  Basic Elements
                </h2>
                <ol>
                  <li>
                    <b>Cats:</b>
                    {' '}
                    there are 7 different cats.
                    {' '}
                    {catImageMap.map((image) => <img src={image} alt="" className={styles.cats} />) }
                  </li>
                  <br />
                  <li>
                    <b>Next:</b>
                    {' '}
                    You are able to see the next three cats that will show on the right hand side of the screen
                  </li>
                  <br />
                  <li>
                    <b>Score</b>
                    {' '}
                    Score increases by 1 for each cat that is removed
                  </li>
                </ol>
                <h2>
                  Gameplay
                </h2>
                <ol>
                  <li>
                    <b>
                      Start:

                    </b>
                    {' '}
                    The game starts with a 9x9 board with 3 randomly placed cats
                  </li>
                  <br />
                  <li>
                    <b>
                      Scoring points:

                    </b>
                    {' '}
                    Score points by arranging at least 5 cats in a row in any direction. Score increases by 1 for every cat that is removed, so if 5 cats are removed that is +5 points. If you score points no new cats are placed on the board.
                    <br />
                    <img src={ruleImage1} alt="" className={styles.ruleImage1} />
                  </li>
                  <li>
                    <b>
                      Limitations:
                      {' '}
                    </b>
                    There must be a clear path to the square in order to place a cat. If there isn&apos;t a clear path an
                    &apos;
                    <strong>X</strong>
                    &apos; will be shown.
                    <br />
                    <br />
                    <img src={ruleImage2} alt="" className={styles.ruleImage1} />
                  </li>
                </ol>
              </section>
              <Button href="/game">Start!</Button>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
