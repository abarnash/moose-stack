const { gql } = require("apollo-server");

const user = gql`
  type User {
    id: ID!
    name: String
    username: String!
    email: String
    token: String
    currentGameUrl: String
  }

  type NewUserResponse {
    success: Boolean!
    message: String
    user: User
  }

  type JoinGameResponse {
    success: Boolean!
    message: String
  }
`;

module.exports = {
  user,
};
