import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Board from './Board';
import BoardContextProvider from './BoardContext';

export default function Game() {
  return (
    <section>
      <DndProvider backend={HTML5Backend}>
        <BoardContextProvider>
          <Board />
        </BoardContextProvider>
      </DndProvider>
    </section>
  );
}
