/* eslint-disable import/no-named-as-default-member */
import React from 'react';
// import PropTypes from 'prop-types';
import styles from '../../styles/Next.css';
import { useBoardContext } from './BoardContext';
import Cat from './Cat';

export default function Next() {
  const { next, cat } = styles;
  const { nextThree } = useBoardContext();
  return (
    <div className={next}>
      {nextThree.map((i, idx) => <Cat className={cat} key={`cat-${`${i.index}${idx}`}`} cat={i} />)}
    </div>
  );
}
