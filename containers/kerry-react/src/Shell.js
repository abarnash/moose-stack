import {useMutation} from '@apollo/react-hooks';
import gql from "graphql-tag";
import React from 'react';
import Navbar from 'react-bootstrap/navbar';
import Nav from 'react-bootstrap/nav';
import Button from 'react-bootstrap/button';
import {Route, useHistory, Switch} from 'react-router-dom';
import './App.css';
import {About} from './About';
import {Game} from './Game';
import {Home} from './Home';

const CREATE_GAME = gql`
  mutation NewGame {
    newGame {
      success
      message
      game {
        url
      }
    }
  }
`;

export function Shell(props) {
  const history = useHistory();
  const onCompleted = (data) => {
    history.push('/' + data.newGame.game.url);
  };
  const onError = () => {
    alert('Error');
  };
  const [createGame, {loading}] = useMutation(CREATE_GAME, {
    onCompleted,
    onError,
  });

  return (
    <div>
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
        <Route path="/:gameName">
          <Game />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}
