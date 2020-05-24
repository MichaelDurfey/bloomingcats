/* eslint-disable react/no-array-index-key */
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Square from './Square';
import brownCat from '../../../assets/1BrownCat.png';
import whiteCat from '../../../assets/2WhiteCat.png';
import blackCat from '../../../assets/3BlackCat.png';
import orangeCat from '../../../assets/4OrangeCat.png';
import greyCat from '../../../assets/5GreyCat.png';
import calicoCat from '../../../assets/6CalicoCat.png';
import siameseCat from '../../../assets/7SiameseCat.png';

const catMap = [brownCat, whiteCat, blackCat, orangeCat, greyCat, calicoCat, siameseCat];
const randomCat = () => catMap[Math.floor(Math.random() * Math.floor(6))];
const defaultBoard = Array.from({ length: 9 },
  () => Array.from({ length: 9 },
    (x, i) => ({ position: i, cat: randomCat(), active: true })));
const defaultBoardSquares = [];
defaultBoard.forEach((arr, idx) => {
  arr.forEach((i, colIdx) => {
    defaultBoardSquares.push(
      <Square
        key={`${idx}-${i.position}`}
        cat={i.cat}
        row={idx}
        column={colIdx}
        active={i.active}
      />,
    );
  });
});

const BoardContext = React.createContext(null);

const BoardContextProvider = ({ children }) => {
  const [isBeingDragged, updateIsDragged] = useState({ row: null, col: null, cat: null });
  const [squares, updateSquares] = useState(defaultBoardSquares);
  const onDrop = (newposition, oldposition) => {
    // update squares
  };

  return (
    <BoardContext.Provider value={{
      squares, onDrop, updateIsDragged, isBeingDragged,
    }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export default BoardContextProvider;
export const useBoardContext = () => useContext(BoardContext);

BoardContextProvider.propTypes = {
  children: PropTypes.objectOf(PropTypes.node).isRequired,
};
