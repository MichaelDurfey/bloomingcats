import React, { useContext } from 'react';
import Board from './Board';
import styles from '../../styles/Home.css';
import BoardContextProvider from './BoardContext';

export default function Game() {
  return (
    <section>
      <BoardContextProvider>
        <Board />
      </BoardContextProvider>
    </section>
  );
}
