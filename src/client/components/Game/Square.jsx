import React from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/Square.css';

const Square = (props) => {
  const {
    key, active, cat, row, column,
  } = props;
  console.log('key!', key);
  return (
    <div
      key={key}
      role="presentation"
      onDragOver={(ev) => {
        ev.preventDefault();
      }}
      onDrop={(ev) => {
        ev.preventDefault();
        const data = ev.dataTransfer.getData('id');
        ev.target.appendChild(document.getElementById(data));
      }}
      className={styles.square}
    >
      { active
        ? (
          <div
            draggable
            onDragStart={(ev, id) => ev.dataTransfer.setData('id', ev.target.id)}
          >
            <img className={styles.image} id={`${row}-${column}`} src={cat} alt="cat" role="presentation" />
          </div>
        ) : null}
    </div>
  );
};

export default Square;

Square.propTypes = {
  active: PropTypes.bool.isRequired,
  key: PropTypes.string.isRequired,
};
