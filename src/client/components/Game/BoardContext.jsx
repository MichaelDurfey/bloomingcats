/* eslint-disable no-loop-func */
/* eslint-disable no-param-reassign */
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
const played = {};
const availableSquares = [];
const randomThreeNumbersFirst = getRandomArrayOfNumsInclusive(80, 3);
let counter = -1;
const catMapDefault = Array.from({ length: 9 })// 9 x 9 board;
  // eslint-disable-next-line array-callback-return
  .map((arr, idx) => Array.from({ length: 9 }, (x, i) => {
    counter += 1;
    const active = randomThreeNumbersFirst.includes(counter);
    if (active) {
      played[idx] = played[idx] || {};
      played[idx][i] = true;
    } else {
      availableSquares[counter] = counter;
    }
    return (
      <Square
        key={`${idx}-${i}`}
        cat={active && randomCat()}
        numberPosition={counter}
        row={idx}
        column={i}
        active={active}
      />
    );
  }));

function updateRow(map, row, ...cordinates) {
  const mapCopy = [...map];
  const rowCopy = [...mapCopy[row]];
  cordinates.forEach((col) => {
    const { numberPosition } = rowCopy[col].props;
    availableSquares[numberPosition] = numberPosition;
    rowCopy[col] = (
      <Square
        key={`${row}-${col}`}
        cat={false}
        numberPosition={numberPosition}
        row={row}
        column={col}
        active={false}
      />
    );
  });
  mapCopy[row] = rowCopy;
  return mapCopy;
}

function updateColumn(map, column, row) {
  const mapCopy = [...map];
  for (let i = row; i < row + 5; i += 1) {
    // eslint-disable-next-line no-plusplus
    const { numberPosition } = mapCopy[i][column].props;
    availableSquares[numberPosition] = numberPosition;
    mapCopy[i] = [...mapCopy[i]];
    mapCopy[i][column] = (
      <Square
        key={`${i}-${column}`}
        cat={false}
        numberPosition={numberPosition}
        row={i}
        column={column}
        active={false}
      />
    );
  }
  return mapCopy;
}

function checkMatch(a, b, c, d, e) {
  // eslint-disable-next-line prefer-rest-params
  return Array.from(arguments).every((value) => typeof value === 'number') && a === b && b === c && c === d && d === e;
}

function checkRows(map, match) {
  let newMap = [...map];
  map.forEach((row, idx) => {
    for (let i = 0; i < 5; i += 1) {
      const catIndex = (modifier) => row[i + modifier || 0].props.cat.index;
      if (checkMatch(catIndex(), catIndex(1), catIndex(2), catIndex(3), catIndex(4))) {
        newMap = updateRow(map, idx, i, i + 1, i + 2, i + 3, i + 4);
        match = true;
      }
    }
  });
  return { newMap, match };
}
function checkColumns(finalMap, match) {
  let newMap = [...finalMap];
  for (let j = 0; j < 8; j += 1) {
    for (let i = 0; i < 5; i += 1) {
      const catIndex = (modifier) => newMap[i + modifier || i][j].props.cat.index;
      if (checkMatch(catIndex(), catIndex(1), catIndex(2), catIndex(3), catIndex(4))) {
        newMap = updateColumn(finalMap, j, i, j + 1, j + 2, j + 3, j + 4);
        match = true;
      }
    }
  }
  return { newMap, match };
}
function checkMajorDiag(finalMap, match) {
  return { newMap: finalMap, match };
}
function checkMinorDiag(finalMap, match) {
  return { newMap: finalMap, match };
}

const BoardContext = React.createContext(null);
const BoardContextProvider = ({ children }) => {
  const [squares, updateSquares] = useState(catMapDefault);

  const checkMatches = (finalMap) => {
    let newMap = [...finalMap];
    let match;
    ({ newMap, match } = checkRows(newMap, match));
    ({ newMap, match } = checkColumns(newMap, match));
    ({ newMap, match } = checkMajorDiag(newMap, match));
    ({ newMap, match } = checkMinorDiag(newMap, match));
    return { match, newMap };
  };

  const rerenderBoard = (newCat, oldCat, cat) => {
    const newMap = [...squares];
    newMap[oldCat.row][oldCat.column] = (
      <Square
        key={`${oldCat.row}-${oldCat.column}`}
        cat={{}}
        numberPosition={oldCat.numberPosition}
        row={oldCat.row}
        column={oldCat.column}
        active={false}
      />
    );
    newMap[newCat.row][newCat.column] = (
      <Square
        key={`${newCat.row}-${newCat.column}`}
        cat={cat}
        numberPosition={newCat.numberPosition}
        row={newCat.row}
        column={newCat.column}
        active
      />
    );
    availableSquares[oldCat.numberPosition] = oldCat.numberPosition;
    availableSquares[newCat.numberPosition] = undefined;
    const totalAvailableSquares = availableSquares.filter((value) => typeof value === 'number');
    played[newCat.row] = played[newCat.row] || {};
    played[newCat.row][newCat.column] = true;
    played[oldCat.row] = played[oldCat.row] || {};
    played[oldCat.row][oldCat.column] = undefined;
    const randomNums = getRandomArrayOfNumsInclusive(totalAvailableSquares.length - 1, 3);
    const randomThreeAvailableNumbers = randomNums.map((value) => totalAvailableSquares[value]);
    let finalMapCounter = -1;
    const { match, newMap: matchedMap } = checkMatches(newMap);
    let finalMap = matchedMap;
    if (!match) {
      finalMap = newMap.map((arr, rowIdx) => arr.map((square, idx) => {
        finalMapCounter += 1;
        if (randomThreeAvailableNumbers.includes(finalMapCounter)) {
          availableSquares[finalMapCounter] = undefined;
          return (
            <Square
              key={`${rowIdx}-${idx}`}
              cat={randomCat()}
              row={rowIdx}
              column={idx}
              numberPosition={idx}
              active
            />
          );
        }
        return square;
      }));
    }
    updateSquares(finalMap);
  };

  return (
    <BoardContext.Provider value={{
      squares, rerenderBoard, catImageSelectedMap,
    }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export default BoardContextProvider;
export const useBoardContext = () => useContext(BoardContext);

BoardContextProvider.propTypes = {
  children: PropTypes.objectOf(PropTypes.object).isRequired,
};
