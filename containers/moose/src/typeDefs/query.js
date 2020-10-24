const { gql } = require("apollo-server");

const query = gql`
  type Query {
    loggedInUser: User,
    allUsers: [User]!

    game(url: String!): Game,
  }
`;

module.exports = {
  query,
};
