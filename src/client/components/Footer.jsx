import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

export default function Footer() {
  return (
    <>
      <Navbar className="justify-content-between" bg="dark" variant="dark">
        <Navbar.Text>
          &copy; 2020 by Michael Durfey. All rights reserved. &nbsp;
        </Navbar.Text>
        <Navbar.Text>
          Made with
          <span role="img" aria-label="heart"> ❤️ </span>
          by CN and Michael
        </Navbar.Text>
      </Navbar>
    </>
  );
}
