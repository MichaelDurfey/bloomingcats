import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Music from './Game/Music';

export default function Header() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Kitten Pop</Navbar.Brand>
        <Nav>
          <Nav.Link href="/game">Game</Nav.Link>
          <Nav.Link href="/rules">Rules</Nav.Link>
          <Nav.Link>
            <Music />
          </Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
}
