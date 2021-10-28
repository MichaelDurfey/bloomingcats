import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Leaderboard from '../Game/Leaderboard';
import { useBoardContext } from '../Game/BoardContext';
import styles from '../../styles/Leaderboard.css';

export default function LeaderboardPage() {
  const { leaderboard, updateLeaderboard } = useBoardContext();
  return (
    <section>
      <Container className={styles.leaderboardPage}>
        <Row>
          <Col>
            <Leaderboard
              leaderboard={leaderboard}
              updateLeaderboard={updateLeaderboard}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
}
