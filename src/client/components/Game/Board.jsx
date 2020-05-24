import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/Board.css';
import { useBoardContext } from './BoardContext';

export default function Board() {
  const { board, boardContainer } = styles;
  const { squares } = useBoardContext();
  return (
    <div className={boardContainer}>
      <div className={board}>
        { squares }
      </div>
    </div>
  );
}
