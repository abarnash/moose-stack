const { gql } = require("apollo-server");

const user = gql`
  type User {
    id: ID!
    name: String
    username: String!
    email: String
    token: String
    currentGameUrl: String
    drinksInPot: Int!
  }

  type NewUserResponse {
    success: Boolean!
    message: String
    user: User
  }

  type LoginResponse {
    success: Boolean!
    message: String
    authenicationToken: String
  }

  type JoinGameResponse {
    success: Boolean!
    message: String
    game: Game
  }
`;

module.exports = {
  user,
};
