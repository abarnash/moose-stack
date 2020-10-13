import React from 'react';
import {Button, Nav, Navbar} from 'react-bootstrap';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import './App.css';
import {Home} from './Home';
import {About} from './About';

function App() {
  const createGame = () => alert('we should implement this');

  return (
    <BrowserRouter>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Online Moose</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
          </Nav>
        <Button onClick={createGame}>
          Create a game
        </Button>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
