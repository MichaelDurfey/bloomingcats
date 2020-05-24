import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default function Header() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">Blooming Cats</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/game">Game</Nav.Link>
          <Nav.Link href="/rules">Rules</Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
}
