/* eslint-disable no-loop-func */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import React, {
  useContext, useState, useCallback,
} from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-cycle
import Square from './Square';
import { catImageMap, catImageSelectedMap } from './images';
import { getRandomArrayOfNumsInclusive, clearPath } from './boardContextHelper';

export const randomCat = () => {
  const index = Math.floor(Math.random() * 7);
  return { index, img: catImageMap[index] };
};

const availableSquares = [];
const randomThreeNumbersFirst = getRandomArrayOfNumsInclusive(80, 3);
const defaultCat = { img: '', index: undefined, numberPosition: undefined };

let counter = -1;
const catMapDefault = Array.from({ length: 9 })// 9 x 9 board;
  // eslint-disable-next-line array-callback-return
  .map((arr, idx) => Array.from({ length: 9 }, (x, i) => {
    counter += 1;
    const active = randomThreeNumbersFirst.includes(counter);
    if (!active) {
      availableSquares[counter] = counter;
    }
    return (
      <Square
        key={`${idx}-${i}`}
        cat={active ? randomCat() : defaultCat}
        numberPosition={counter}
        row={idx}
        column={i}
        active={active}
      />
    );
  }));

function updateRow(map, row, i, index, newScore) {
  const mapCopy = [...map.map((v) => [...v])];
  for (let x = i; x < mapCopy.length; x += 1) {
    if (mapCopy[row] && mapCopy[row][x]
      && mapCopy[row][x].props.cat.index === index) {
      const { numberPosition } = mapCopy[row][x].props;
      availableSquares[numberPosition] = numberPosition;
      newScore += 1;
      mapCopy[row][x] = (
        <Square
          key={`${row}-${x}`}
          cat={defaultCat}
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
  return { newMap: mapCopy, newScore };
}

function updateColumn(map, column, row, index, newScore) {
  const mapCopy = [...map.map((v) => [...v])];
  for (let i = row; i < mapCopy.length; i += 1) {
    // eslint-disable-next-line no-plusplus
    if (mapCopy[i][column].props.cat.index === index) {
      const { numberPosition } = mapCopy[i][column].props;
      availableSquares[numberPosition] = numberPosition;
      newScore += 1;
      mapCopy[i][column] = (
        <Square
          key={`${i}-${column}`}
          cat={defaultCat}
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
  return { newMap: mapCopy, newScore };
}

function updateMajorDiag(finalMap, j, row, index, newScore) {
  const majordiagCopy = [...finalMap.map((v) => [...v])];
  let temp = j;
  for (let x = row; x < majordiagCopy.length; x += 1) {
    if (majordiagCopy[x] && majordiagCopy[x][temp]
      && majordiagCopy[x][temp].props.cat.index === index) {
      const { numberPosition } = majordiagCopy[x][temp].props;
      availableSquares[numberPosition] = numberPosition;
      newScore += 1;
      majordiagCopy[x][temp] = (
        <Square
          key={`${x}-${temp}`}
          cat={defaultCat}
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
  return { newMap: majordiagCopy, newScore };
}

function updateMinorDiag(finalMap, j, row, index, newScore) {
  const minordiagCopy = [...finalMap.map((v) => [...v])];
  let temp = row;
  for (let x = j; x >= 0; x -= 1) {
    if (!minordiagCopy[temp] || !minordiagCopy[temp][x]) {
      x -= 1;
    } else {
      const { numberPosition } = minordiagCopy[temp][x].props;
      const catIndex = minordiagCopy[temp][x].props.cat.index;
      if (catIndex !== index) break;
      newScore += 1;
      availableSquares[numberPosition] = numberPosition;
      minordiagCopy[temp][x] = (
        <Square
          key={`${temp}-${x}`}
          cat={defaultCat}
          numberPosition={numberPosition}
          row={temp}
          column={x}
          active={false}
        />
      );
      temp += 1;
    }
  }
  return { newMap: minordiagCopy, newScore };
}

function checkMatch(a, b, c, d, e) {
  // eslint-disable-next-line prefer-rest-params
  return Array.from(arguments).every((value) => typeof value === 'number')
  && a === b && b === c && c === d && d === e;
}

function checkRows(map, match, newScore) {
  let newMap = map;
  map.forEach((row, idx) => {
    for (let i = 0; i < 5; i += 1) {
      const catIndex = (modifier) => row[modifier
        ? i + modifier : i].props.cat.index;
      if (checkMatch(catIndex(), catIndex(1),
        catIndex(2), catIndex(3), catIndex(4))) {
        ({ newMap, newScore } = updateRow(map, idx, i, catIndex(), newScore));
        match = true;
        break;
      }
    }
  });
  return { newMap, match, newScore };
}
function checkColumns(finalMap, match, newScore) {
  let newMap = [...finalMap];
  for (let j = 0; j <= 8; j += 1) {
    for (let i = 0; i < 5; i += 1) {
      const catIndex = (modifier) => newMap[modifier
        ? i + modifier : i][j].props.cat.index;
      if (checkMatch(catIndex(), catIndex(1),
        catIndex(2), catIndex(3), catIndex(4))) {
        ({ newMap, newScore } = updateColumn(finalMap, j, i, catIndex(), newScore));
        match = true;
        break;
      }
    }
  }
  return { newMap, match, newScore };
}

function checkMajorDiag(finalMap, match, newScore) {
  let newMap = finalMap;
  for (let i = -4; i < finalMap.length; i += 1) {
    let row = 0;
    for (let j = i; j < 5; j += 1) {
      const catIndex = (modifier) => finalMap[modifier
        ? row + modifier : row][modifier
        ? j + modifier : j].props.cat.index;
      if (finalMap[row] && finalMap[row + 4] && finalMap[row][j]) {
        if (checkMatch(catIndex(), catIndex(1),
          catIndex(2), catIndex(3), catIndex(4))) {
          ({ newMap, newScore } = updateMajorDiag(finalMap, j, row, catIndex(), newScore));
          match = true;
          break;
        }
      }
      row += 1;
    }
  }
  return { newMap, match, newScore };
}

function checkMinorDiag(finalMap, match, newScore) {
  let newMap = finalMap;
  for (let i = finalMap.length + 4; i > 3; i -= 1) {
    let row = 0;
    for (let j = i; j >= 4; j -= 1) {
      const catIndex = (modifier) => finalMap[modifier
        ? row + modifier : row][modifier
        ? j - modifier : j].props.cat.index;
      if (finalMap[row] && finalMap[row + 4] && finalMap[row][j]) {
        if (checkMatch(catIndex(), catIndex(1),
          catIndex(2), catIndex(3), catIndex(4))) {
          ({ newMap, newScore } = updateMinorDiag(finalMap, j, row, catIndex(), newScore));
          match = true;
          break;
        }
      }
      row += 1;
    }
  }
  return { newMap, match, newScore };
}

const BoardContext = React.createContext(null);
const BoardContextProvider = ({ children }) => {
  const [squares, updateSquares] = useState(catMapDefault);
  const [score, updateScore] = useState(0);
  const nextThreeCats = useCallback(() => Array.from({ length: 3 }, () => randomCat()), []);
  const [nextThree, getNextThreeCats] = useState(nextThreeCats());
  const [playable, updatePlayable] = useState(true);
  const checkMatches = (finalMap) => {
    let newMap = [...finalMap];
    let match;
    let newScore = score;
    ({ newMap, match, newScore } = checkRows(newMap, match, newScore));
    ({ newMap, match, newScore } = checkColumns(newMap, match, newScore));
    ({ newMap, match, newScore } = checkMajorDiag(newMap, match, newScore));
    ({ newMap, match, newScore } = checkMinorDiag(newMap, match, newScore));
    if (score !== newScore) {
      updateScore(newScore);
    }
    return { match, newMap };
  };

  const rerenderBoard = (newCat, oldCat, cat) => {
    const newMap = [...squares];
    const hasClearPath = clearPath(oldCat, newCat, squares);
    if (!hasClearPath) {
      newMap[newCat.row][newCat.column] = (
        <Square
          key={`${newCat.row}-${newCat.column}`}
          cat={defaultCat}
          numberPosition={newCat.numberPosition}
          row={newCat.row}
          noClearPath
          column={newCat.column}
          active={false}
        />
      );
      updatePlayable(false);
      updateSquares(newMap.map((row) => [...row]));
      setTimeout(() => {
        const pathCopy = [...squares.map((r) => [...r])];
        pathCopy[newCat.row][newCat.column] = (
          <Square
            key={`${newCat.row}-${newCat.column}`}
            cat={defaultCat}
            numberPosition={newCat.numberPosition}
            row={newCat.row}
            column={newCat.column}
            active={false}
          />
        );
        updateSquares(pathCopy);
        updatePlayable(true);
      }, 1500);
      return;
    }
    newMap[oldCat.row][oldCat.column] = (
      <Square
        key={`${oldCat.row}-${oldCat.column}`}
        cat={defaultCat}
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
    const totalAvailableSquares = availableSquares
      .filter((value) => typeof value === 'number');
    const randomNums = getRandomArrayOfNumsInclusive(totalAvailableSquares.length - 1, 3);
    const randomThreeAvailableNumbers = randomNums
      .map((value) => totalAvailableSquares[value]);
    let finalMapCounter = -1;
    const { match, newMap: matchedMap } = checkMatches(newMap);
    let finalMap = matchedMap;

    if (!match) {
      finalMap = newMap.map((arr, rowIdx) => arr
        .map((square, idx) => {
          finalMapCounter += 1;
          if (randomThreeAvailableNumbers.includes(finalMapCounter)) {
            availableSquares[finalMapCounter] = undefined;
            return (
              <Square
                key={`${rowIdx}-${idx}`}
                cat={nextThree.shift()}
                row={rowIdx}
                column={idx}
                numberPosition={finalMapCounter}
                active
              />
            );
          }
          return square;
        }));
      ({ newMap: finalMap } = checkMatches(finalMap));
      getNextThreeCats(nextThreeCats());
    }
    updateSquares(finalMap);
  };

  return (
    <BoardContext.Provider value={{
      squares, rerenderBoard, catImageSelectedMap, score, nextThree, playable,
    }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export default BoardContextProvider;
export const useBoardContext = () => useContext(BoardContext);

BoardContextProvider.propTypes = {
  children: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.symbol, PropTypes.func, PropTypes.object]),
  ).isRequired,
};
