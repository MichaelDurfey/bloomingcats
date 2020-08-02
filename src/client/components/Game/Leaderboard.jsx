
import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import styles from '../../styles/Leaderboard.css';

export default function Leaderboard({ leaderboard, updateLeaderboard }) {
  useEffect(() => {
    fetch('https://kittenpopserv.herokuapp.com/leaders')
      .then((response) => response.json())
      .then((data) => updateLeaderboard(data));
  }, []);

  const { mainContainer } = styles;

  return (
    <Container className={mainContainer}>
      <Row>
        <Col>
          <div>
            <h3>
              <Badge variant="secondary">
                Leaderboard
              </Badge>
            </h3>
            {Array.isArray(leaderboard) && leaderboard.length
              ? (
                <ListGroup>
                  {
              leaderboard.map((entry, i) => (
                <ListGroup.Item variant="secondary">
                  {i + 1}
                  {'. '}
                  {' '}
                  {entry.name}
                  {' '}
                  {' '}
                  { entry.score}
                </ListGroup.Item>
              ))
              }
                </ListGroup>
              )
              : <Spinner animation="border" variant="primary" />}
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
