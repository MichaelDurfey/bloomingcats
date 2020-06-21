import React from 'react';
import PropTypes from 'prop-types';
import { useDrag, DragPreviewImage } from 'react-dnd';
import ItemTypes from '../../constants';
import styles from '../../styles/Cat.css';
// eslint-disable-next-line import/no-cycle
import { useBoardContext } from './BoardContext';


export default function Cat({
  cat, numberPosition, row, column, className,
}) {
  const { catImageSelectedMap, playable } = useBoardContext();
  const [{ isDragging }, drag, preview] = useDrag({
    item: {
      type: ItemTypes.CAT, position: { row, column, numberPosition }, cat,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      position: monitor,
      canDrag: playable,
    }),
  });
  const dragSource = () => (
    <>
      <div ref={drag} className={styles.dragSource} />
      <img className={className || styles.image} id={numberPosition} src={cat.img} alt="cat" role="presentation" />
    </>
  );
  return (
    <>
      <DragPreviewImage
        connect={preview}
        src={catImageSelectedMap[cat.index]}
      />
      {(!isDragging && dragSource())
      || <img ref={drag} className={styles.image} id={numberPosition} src={catImageSelectedMap[cat.index]} alt="cat" role="presentation" />}
    </>
  );
}

Cat.propTypes = {
  cat: PropTypes.shape({ img: PropTypes.string, index: PropTypes.number }).isRequired,
  numberPosition: PropTypes.number,
  row: PropTypes.number,
  column: PropTypes.number,
  className: PropTypes.objectOf(PropTypes.string),
};

Cat.defaultProps = {
  numberPosition: undefined,
  row: undefined,
  column: undefined,
  className: undefined,
};
