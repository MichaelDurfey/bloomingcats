/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import Board from './Board';
import BoardContextProvider from './BoardContext';

function isTouchDevice() {
  // eslint-disable-next-line no-undef
  if (typeof window !== 'undefined' && (('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch))) {
    return true;
  }
  return false;
}

export default function Game() {
  return (
    <section>
      <DndProvider backend={isTouchDevice() ? TouchBackend : HTML5Backend}>
        <BoardContextProvider>
          <Board />
        </BoardContextProvider>
      </DndProvider>
    </section>
  );
}
