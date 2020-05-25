import React from 'react';
import PropTypes from 'prop-types';
import { useDrag, DragPreviewImage } from 'react-dnd';
import ItemTypes from '../../constants';
import styles from '../../styles/Cat.css';
// eslint-disable-next-line import/no-cycle
import { useBoardContext } from './BoardContext';


export default function Cat({ cat, numberPosition }) {
  const [{ isDragging }, drag, preview] = useDrag({
    item: { type: ItemTypes.CAT, position: numberPosition, cat },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      position: monitor,
    }),
  });
  const { catImageSelectedMap } = useBoardContext();
  return (
    <>
      <DragPreviewImage
        connect={preview}
        src={catImageSelectedMap[cat.index]}
      />
      {(!isDragging && <img ref={drag} className={styles.image} id={numberPosition} src={cat.img} alt="cat" role="presentation" />)
      || <img ref={drag} className={styles.image} id={numberPosition} src={catImageSelectedMap[cat.index]} alt="cat" role="presentation" />}
    </>
  );
}

Cat.propTypes = {
  cat: PropTypes.string.isRequired,
  numberPosition: PropTypes.number.isRequired,
};
