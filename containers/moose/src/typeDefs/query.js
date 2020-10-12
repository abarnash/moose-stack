const { gql } = require("apollo-server");

const query = gql`
  type Query {
    loggedInUser: User,

    game(url: String!): Game,
  }
`;

module.exports = {
  query,
};
