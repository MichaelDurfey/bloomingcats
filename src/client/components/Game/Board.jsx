/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import styles from '../../styles/Board.css';
import { useBoardContext } from './BoardContext';
import Score from './Score';
import Next from './Next';

export default function Board() {
  const {
    board, boardContainer, nextAndScore,
  } = styles;
  const {
    squares, score, gameOver, updateLeaderboard,
  } = useBoardContext();
  const [name, updateName] = useState();
  const [submitted, updateSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://kittenpopserv.herokuapp.com/leader', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Method': 'POST',
      },
      credentials: 'omit',
      body: JSON.stringify({ name, score }),
    }).then((res) => res.json())
      .then((data) => {
        updateLeaderboard(data);
        updateSubmitted(true);
        window.location.assign('/game');
      });
  };

  const handleNameChange = (e) => {
    e.preventDefault();
    updateName(e.target.value);
  };
  return (
    <div className={boardContainer}>
      <div className={nextAndScore}>
        <Score />
        <Next />
      </div>
      <div className={board}>
        { squares }
      </div>
      { gameOver && !submitted && (
        <div className={styles.gameOverContainer}>
          <h1 className={styles.gameOverText}>Game over</h1>
          <p>enter your name for the leaderboard!</p>
          <form className="form-inline">
            <label className="sr-only" htmlFor="inlineFormInputName2">Name</label>
            <input type="text" onChange={handleNameChange} name="inlineFormInputName2" className="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Jane Doe" />
            <button type="button" onClick={handleSubmit} className="btn btn-primary mb-2">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}
