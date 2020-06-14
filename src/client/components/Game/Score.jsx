import React from 'react';
import styles from '../../styles/Score.css';
import { useBoardContext } from './BoardContext';

export default function Board() {
  const { scoreContainer, scoreText } = styles;
  const { score } = useBoardContext();
  return (
    <div className={scoreContainer}>
      <div className={scoreText}>
        <h1>
          Score
        </h1>
        <p>
          {score }
        </p>
      </div>
    </div>
  );
}
