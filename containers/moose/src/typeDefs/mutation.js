const { gql } = require("apollo-server");

const mutation = gql`
  type Mutation {
    newUser(username: String!, name: String, email: String): NewUserResponse!
    login(username: String!): User!

    newGame: NewGameResponse!
    joinGame(url: String!): JoinGameResponse!
  }
`;

module.exports = {
  mutation,
};
