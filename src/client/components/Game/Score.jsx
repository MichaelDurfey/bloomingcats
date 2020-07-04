import React from 'react';
import styles from '../../styles/Score.css';
import { useBoardContext } from './BoardContext';

export default function Board() {
  const { scoreContainer, scoreText, scoreNumber } = styles;
  const { score } = useBoardContext();
  return (
    <div className={scoreContainer}>
      <div className={scoreText}>
        <h3>
          Score
        </h3>
        <h3 className={scoreNumber}>
          {score }
        </h3>
      </div>
    </div>
  );
}
