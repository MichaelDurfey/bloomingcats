import React from 'react';
// import PropTypes from 'prop-types';
import styles from '../../styles/Board.css';
import { useBoardContext } from './BoardContext';
import Score from './Score';
import Next from './Next';
import Music from './Music';

export default function Board() {
  const { board, boardContainer, nextAndScore } = styles;
  const { squares } = useBoardContext();
  return (
    <div className={boardContainer}>
      <div className={nextAndScore}>
        <Score />
        <Next />
        <Music />
      </div>
      <div className={board}>
        { squares }
      </div>
    </div>
  );
}
