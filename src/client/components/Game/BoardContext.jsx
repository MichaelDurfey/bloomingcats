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

function updateRow(map, row, i, index) {
  const mapCopy = [...map.map((v) => [...v])];
  for (let x = i; x < mapCopy.length; x += 1) {
    if (mapCopy[row] && mapCopy[row][x] && mapCopy[row][x].props.cat.index === index) {
      const { numberPosition } = mapCopy[row][x].props;
      availableSquares[numberPosition] = numberPosition;
      mapCopy[row][x] = (
        <Square
          key={`${row}-${x}`}
          cat={false}
          numberPosition={numberPosition}
          row={row}
          column={x}
          active={false}
        />
      );
    } else {
      break;
    }
  }
  return mapCopy;
}

function updateColumn(map, column, row, index) {
  const mapCopy = [...map.map((v) => [...v])];
  for (let i = row; i < mapCopy.length; i += 1) {
    // eslint-disable-next-line no-plusplus
    if (mapCopy[i][column].props.cat.index === index) {
      const { numberPosition } = mapCopy[i][column].props;
      availableSquares[numberPosition] = numberPosition;
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
    } else {
      break;
    }
  }
  return mapCopy;
}

function checkMatch(a, b, c, d, e) {
  // eslint-disable-next-line prefer-rest-params
  return Array.from(arguments).every((value) => typeof value === 'number') && a === b && b === c && c === d && d === e;
}

function checkRows(map, match) {
  let newMap = map;
  map.forEach((row, idx) => {
    for (let i = 0; i < 5; i += 1) {
      const catIndex = (modifier) => row[i + modifier || i].props.cat.index;
      if (checkMatch(catIndex(), catIndex(1), catIndex(2), catIndex(3), catIndex(4))) {
        newMap = updateRow(map, idx, i, catIndex());
        match = true;
        break;
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
        newMap = updateColumn(finalMap, j, i, catIndex());
        match = true;
        break;
      }
    }
  }
  return { newMap, match };
}

function updateMajorDiag(finalMap, j, row, index) {
  const majordiagCopy = [...finalMap.map((v) => [...v])];
  let temp = j;
  for (let x = row; x < majordiagCopy.length; x += 1) {
    if (majordiagCopy[x] && majordiagCopy[x][temp] && majordiagCopy[x][temp].props.cat.index === index) {
      const { numberPosition } = majordiagCopy[x][temp].props;
      availableSquares[numberPosition] = numberPosition;
      majordiagCopy[x][temp] = (
        <Square
          key={`${x}-${temp}`}
          cat={false}
          numberPosition={numberPosition}
          row={x}
          column={temp}
          active={false}
        />
      );
    } else {
      break;
    }
    temp += 1;
  }
  return majordiagCopy;
}

function updateMinorDiag(finalMap, j, row, index) {
  const minordiagCopy = [...finalMap.map((v) => [...v])];
  let temp = row;
  for (let x = j; x >= 0; x -= 1) {
    if (!minordiagCopy[temp] || !minordiagCopy[temp][x]) {
      x -= 1;
    } else {
      const { numberPosition } = minordiagCopy[temp][x].props;
      const catIndex = minordiagCopy[temp][x].props.cat.index;
      if (catIndex !== index) break;
      availableSquares[numberPosition] = numberPosition;
      minordiagCopy[temp][x] = (
        <Square
          key={`${temp}-${x}`}
          cat={false}
          numberPosition={numberPosition}
          row={temp}
          column={x}
          active={false}
        />
      );
      temp += 1;
    }
  }
  return minordiagCopy;
}

function checkMajorDiag(finalMap, match) {
  for (let i = -4; i < finalMap.length; i += 1) {
    let row = 0;
    for (let j = i; j < 5; j += 1) {
      const catIndex = (modifier) => finalMap[row + modifier || row][j + modifier || j].props.cat.index;
      if (finalMap[row] && finalMap[row + 4] && finalMap[row][j]) {
        if (checkMatch(catIndex(), catIndex(1), catIndex(2), catIndex(3), catIndex(4))) {
          finalMap = updateMajorDiag(finalMap, j, row, catIndex());
          match = true;
          break;
        }
      }
      row += 1;
    }
  }
  return { newMap: finalMap, match };
}

function checkMinorDiag(finalMap, match) {
  for (let i = finalMap.length + 4; i > 3; i -= 1) {
    let row = 0;
    for (let j = i; j >= 4; j -= 1) {
      const catIndex = (modifier) => finalMap[modifier ? row + modifier : row][modifier ? j - modifier : j].props.cat.index;
      if (finalMap[row] && finalMap[row + 4] && finalMap[row][j]) {
        // console.log('checkMatch', catIndex(), catIndex(1), catIndex(2), catIndex(3), catIndex(4));
        // console.log('checkMatch', row + undefined || row, 'j', j, row + 1, 'j', j - 1, row + 2, 'j', j - 2, row + 3, 'j', j - 3, row + 4, 'j', 4 - 4 || 'HEY!!');
        if (checkMatch(catIndex(), catIndex(1), catIndex(2), catIndex(3), catIndex(4))) {
          finalMap = updateMinorDiag(finalMap, j, row, catIndex());
          match = true;
          break;
        }
      }
      row += 1;
    }
  }
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
      ({ newMap: finalMap } = checkMatches(finalMap));
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
