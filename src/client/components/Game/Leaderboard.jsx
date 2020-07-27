
import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import styles from '../../styles/Leaderboard.css';

export default function Leaderboard({ leaderboard, updateLeaderboard }) {
  useEffect(() => {
    fetch('http://localhost:8000/leaders')
      .then((response) => response.json())
      .then((data) => updateLeaderboard(data));
  }, []);

  const { mainContainer } = styles;

  return (
    <Container className={mainContainer}>
      <Row>
        <Col>
          <div>
            <h4>
              Leaderboard
            </h4>
            <p>get to the end to leave your name!</p>
            {leaderboard && Array.isArray(leaderboard)
              && leaderboard.map((entry, i) => (
                <div>
                  {i + 1}
                  {'. '}
                  {' '}
                  {entry.name}
                  {' '}
                  {' '}
                  { entry.score}
                </div>
              ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

Leaderboard.propTypes = {
  leaderboard: PropTypes.arrayOf(
    PropTypes.shape([{ name: PropTypes.string, score: PropTypes.number }]),
  ).isRequired,
  updateLeaderboard: PropTypes.func.isRequired,
};
