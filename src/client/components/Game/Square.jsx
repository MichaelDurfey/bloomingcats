import React from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import styles from '../../styles/Square.css';
// eslint-disable-next-line import/no-cycle
import Cat from './Cat';
import ItemTypes from '../../constants';
// eslint-disable-next-line import/no-cycle
import { useBoardContext } from './BoardContext';

const Square = (props) => {
  const {
    active, cat, numberPosition, row, column,
  } = props;
  const { squares, rerenderBoard } = useBoardContext();
  const [, drop] = useDrop({
    accept: ItemTypes.CAT,
    drop: (oldCat) => rerenderBoard({ row, column, numberPosition }, oldCat.position, oldCat.cat),
    canDrop: () => !squares[row][column].props.active,
    collect: (mon) => ({
      isOver: !!mon.isOver(),
      canDrop: !!mon.canDrop(),
    }),
  });
  return (
    <div
      ref={drop}
      role="presentation"
      id={numberPosition}
      className={styles.square}
    >
      { active ? <Cat numberPosition={numberPosition} row={row} column={column} cat={cat} /> : null}
    </div>
  );
};

export default Square;

Square.propTypes = {
  active: PropTypes.bool.isRequired,
  cat: PropTypes.shape({ index: PropTypes.number, img: PropTypes.string }).isRequired,
  numberPosition: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
  column: PropTypes.number.isRequired,
};
