
import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';

export default function Leaderboard({ leaderboard }) {
  useEffect(() => {
    fetch('http://localhost:8000/leaders')
      .then((response) => console.log('res', response))
      .then((data) => console.log(data));
  }, []);

  return (
    <section>
      <Container>
        <Row>
          <Col>
            <div>
              <h4>
                Leaderboard
              </h4>
              {leaderboard && Array.isArray(leaderboard)
              && leaderboard.map((entry, i) => (
                <div>
                  {i + 1}
                  {': '}
                  <b>name:</b>
                  {' '}
                  {entry.name}
                  {' '}
                  <b>score:</b>
                  {' '}
                  { entry.score}
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

Leaderboard.propTypes = {
  leaderboard: PropTypes.arrayOf(
    PropTypes.shape([{ name: PropTypes.string, score: PropTypes.number }]),
  ).isRequired,
  updateLeaderboard: PropTypes.func.isRequired,
};
