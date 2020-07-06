import React from 'react';
// import PropTypes from 'prop-types';
import styles from '../../styles/Board.css';
import { useBoardContext } from './BoardContext';
import Score from './Score';
import Next from './Next';

export default function Board() {
  const {
    board, boardContainer, nextAndScore,
  } = styles;
  const { squares, gameOver } = useBoardContext();
  return (
    <div className={boardContainer}>
      <div className={nextAndScore}>
        <Score />
        <Next />
      </div>
      <div className={board}>
        { squares }
      </div>
      { gameOver && (
      <div className={styles.gameOverContainer}>
        <h1 className={styles.gameOverText}>Game over</h1>
      </div>
      )}
    </div>
  );
}
