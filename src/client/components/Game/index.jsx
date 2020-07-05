/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import Board from './Board';
import BoardContextProvider from './BoardContext';
import kittenPopIntro from '../../../assets/audio/KittenPopIntro.mp3';
import kittenPopMain from '../../../assets/audio/KittenPopMain.mp3';

function isTouchDevice() {
  // eslint-disable-next-line no-undef
  if (('ontouchstart' in window) || (window.DocumentTouch && document instanceof DocumentTouch)) {
    return true;
  }
  return false;
}

function audio() {
  const audioElement = (
    <audio
      src={kittenPopMain}
        // loop
      id="kittenPopMainTune"
      onTimeUpdate={(e) => {
        const buffer = 0.13;
        if (e.target.currentTime > e.target.duration - buffer) {
          e.target.currentTime = 0;
          e.target.play();
        }
      }}
    />
  );
  return audioElement;
}

export default function Game() {
  return (
    <section>
      <DndProvider backend={isTouchDevice() ? TouchBackend : HTML5Backend}>
        <BoardContextProvider>
          <Board />
        </BoardContextProvider>
      </DndProvider>
      {audio()}
      <audio
        src={kittenPopIntro}
        autoPlay
        onTimeUpdate={(e) => {
          const buffer = 0.16;
          if (e.target.currentTime > e.target.duration - buffer) {
            document.getElementById('kittenPopMainTune').play();
          }
        }}
      />
    </section>
  );
}
