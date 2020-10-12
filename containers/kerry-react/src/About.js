import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import gql from "graphql-tag";

const GET_ADA_USER = gql`
{
  user(username: "@ada") {
    name
  }
}`

export function About() {
  const {data, loading, error} = useQuery(GET_ADA_USER);

  return (
    <div className="About">
      MOOOOOOOSE
      {loading ? <p>Loading...</p> : data && data.user && data.user.name}
    </div>
  );
}
