import React from 'react';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import styles from '../../styles/Square.css';
import Cat from './Cat';
import ItemTypes from '../../constants';
// eslint-disable-next-line import/no-cycle
import { useBoardContext } from './BoardContext';

const Square = (props) => {
  const {
    active, cat, numberPosition,
  } = props;
  const { squares, rerenderBoard } = useBoardContext();
  const [, drop] = useDrop({
    accept: ItemTypes.CAT,
    drop: (item) => rerenderBoard(numberPosition, item.position, item.cat),
    canDrop: () => !squares[numberPosition].props.active,
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
      { active ? <Cat numberPosition={numberPosition} cat={cat} /> : null}
    </div>
  );
};

export default Square;

Square.propTypes = {
  active: PropTypes.bool.isRequired,
  cat: PropTypes.shape({ index: PropTypes.number, img: PropTypes.string }).isRequired,
  numberPosition: PropTypes.number.isRequired,
};
