import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

export default function Footer() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Text>
          Made with
          <span role="img" aria-label="heart"> ❤️</span>
          by CN and Michael
        </Navbar.Text>
      </Navbar>
    </>
  );
}
