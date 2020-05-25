/* eslint-disable react/no-array-index-key */
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-cycle
import Square from './Square';
import brownCat from '../../../assets/1BrownCat.png';
import whiteCat from '../../../assets/2WhiteCat.png';
import blackCat from '../../../assets/3BlackCat.png';
import orangeCat from '../../../assets/4OrangeCat.png';
import greyCat from '../../../assets/5GreyCat.png';
import calicoCat from '../../../assets/6CalicoCat.png';
import siameseCat from '../../../assets/7SiameseCat.png';
import brownCatSelected from '../../../assets/1BrownCatSelected.gif';
import whiteCatSelected from '../../../assets/2WhiteCatSelected.gif';
import blackCatSelected from '../../../assets/3BlackCatSelected.gif';
import orangeCatSelected from '../../../assets/4OrangeCatSelected.gif';
import greyCatSelected from '../../../assets/5GreyCatSelected.gif';
import calicoCatSelected from '../../../assets/6CalicoCatSelected.gif';
import siameseCatSelected from '../../../assets/7SiameseCatSelected.gif';

// selected

const catImageMap = [brownCat, whiteCat, blackCat, orangeCat, greyCat, calicoCat, siameseCat];
const catImageSelectedMap = [brownCatSelected,
  whiteCatSelected,
  blackCatSelected,
  orangeCatSelected,
  greyCatSelected,
  calicoCatSelected,
  siameseCatSelected];
function getRandomArrayOfNumsInclusive(max, length) {
  const arr = Array.from({ length: max + 1 }, (x, i) => i);
  let i = arr.length;
  let j = 0;
  let temp;

  // eslint-disable-next-line no-plusplus
  while (i--) {
    j = Math.floor(Math.random() * (i + 1));

    // swap randomly chosen element with current element
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr.slice(0, length);
}
const randomCat = () => {
  const index = Math.floor(Math.random() * 7);
  return { index, img: [catImageMap[index]] };
};
const randomThreeNumbersFirst = getRandomArrayOfNumsInclusive(80, 3);
const catMapDefault = Array.from({ length: 81 })// 9 x 9 board;
  .map((arr, idx) => {
    const active = randomThreeNumbersFirst.includes(idx);
    return (
      <Square
        key={`${idx}`}
        cat={active && randomCat()}
        numberPosition={idx}
        active={active}
      />
    );
  });

const BoardContext = React.createContext(null);

const BoardContextProvider = ({ children }) => {
  const [isBeingDragged, updateIsDragged] = useState({ row: null, col: null, cat: null });
  const [squares, updateSquares] = useState(catMapDefault);

  const rerenderBoard = (newCatPosition, oldCatToRemove, cat) => {
    const newMap = [...squares];
    newMap[oldCatToRemove] = (
      <Square
        key={`${oldCatToRemove}`}
        cat={{}}
        numberPosition={oldCatToRemove}
        active={false}
      />
    );
    newMap[newCatPosition] = (
      <Square
        key={`${newCatPosition}`}
        cat={cat}
        numberPosition={newCatPosition}
        active
      />
    );
    const availableSquares = newMap.map((item) => {
      if (!item.props.active) {
        return item.props.numberPosition;
      }
      return false;
    }).filter((value) => typeof value === 'number');
    const randomNums = getRandomArrayOfNumsInclusive(availableSquares.length - 1, 3);
    const randomThreeAvailableNumbers = randomNums.map((value) => availableSquares[value]);
    const finalMap = newMap.map((item, idx) => {
      if (randomThreeAvailableNumbers.includes(item.props.numberPosition)) {
        return (
          <Square
            key={`${idx}`}
            cat={randomCat()}
            numberPosition={idx}
            active
          />
        );
      }
      return item;
    });
    updateSquares(finalMap);
  };

  return (
    <BoardContext.Provider value={{
      squares, rerenderBoard, updateIsDragged, isBeingDragged, catImageSelectedMap,
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
