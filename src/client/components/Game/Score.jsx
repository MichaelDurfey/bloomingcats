import React from 'react';
import styles from '../../styles/Score.css';
import { useBoardContext } from './BoardContext';

export default function Board() {
  const { scoreContainer, scoreText, scoreNumber } = styles;
  const { score } = useBoardContext();
  return (
    <div className={scoreContainer}>
      <div className={scoreText}>
        <h5>
          Score
        </h5>
        <h5 className={scoreNumber}>
          {score }
        </h5>
      </div>
    </div>
  );
}
