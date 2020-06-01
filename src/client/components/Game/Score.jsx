import React from 'react';
import styles from '../../styles/Score.css';
import { useBoardContext } from './BoardContext';

export default function Board() {
  const { scoreContainer } = styles;
  const { score } = useBoardContext();
  return (
    <div className={scoreContainer}>
      <p>
        {score }
      </p>
    </div>
  );
}
