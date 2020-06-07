import React from 'react';
// import PropTypes from 'prop-types';
import styles from '../../styles/Next.css';
import { useBoardContext } from './BoardContext';
import Cat from './Cat';

export default function Next() {
  const { next } = styles;
  const { nextThree } = useBoardContext();
  return (
    <div className={next}>
      {nextThree.map((i) => <Cat cat={i} />)}
    </div>
  );
}
