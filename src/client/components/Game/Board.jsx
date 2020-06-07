import React from 'react';
// import PropTypes from 'prop-types';
import styles from '../../styles/Board.css';
import { useBoardContext } from './BoardContext';
import Score from './Score';
import Next from './Next';

export default function Board() {
  const { board, boardContainer, nextAndSquares } = styles;
  const { squares } = useBoardContext();
  return (
    <div className={boardContainer}>
      <Score />
      <div className={nextAndSquares}>
        <div className={board}>
          { squares }
        </div>
        <Next />
      </div>
    </div>
  );
}
