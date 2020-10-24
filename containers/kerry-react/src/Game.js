import {useQuery} from '@apollo/react-hooks';
import gql from "graphql-tag";
import React, {useState} from 'react';
import {useParams} from 'react-router-dom';

const GET_GAME = gql`
  query Game($url: String!) {
    game(url: $url) {
      id
    }
  }
`;

export function Game() {
  const [state, setState] = useState({foo: 'bar'});
  //setState({foo: 'baz'});
  const {gameName} = useParams();
  const {data, loading, error} = useQuery(GET_GAME, {
    variables: {url: gameName},
  });

  if (loading) {
    return (<p>Loading...</p>);
  }

  return (
    <div>
      <div>
        Game ID: {data.game.id}
      </div>
    </div>
  );
}
