
export function getRandomArrayOfNumsInclusive(max, length) {
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

export function clearPath(oldCat, newCat, squares = []) {
  const squareCopy = [
    ...squares.map((i) => i.map((k) => ({ active: k.props.active, visited: false }))),
  ];
  let path;
  const traverse = (column, row) => {
    if ((newCat.row === row && newCat.column === column) || path) {
      // eslint-disable-next-line no-param-reassign
      path = true;
      return;
    }
    if (squareCopy[row] && squareCopy[row][column]
        && ((!squareCopy[row][column].visited && !squareCopy[row][column].active)
        || (row === oldCat.row && column === oldCat.column))) {
      squareCopy[row][column].visited = true;
      if (column < squareCopy.length - 1) {
        traverse(column + 1, row);
      }
      if (row < squareCopy.length - 1) {
        traverse(column, row + 1);
      }
      if (column > 0) {
        traverse(column - 1, row);
      }
      if (row > 0) {
        traverse(column, row - 1);
      }
    }
  };
  traverse(oldCat.column, oldCat.row);
  return path;
}
