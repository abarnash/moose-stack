const { gql } = require("apollo-server");

const user = gql`
  type User {
    id: ID!
    name: String
    username: String!
    email: String
    token: String
  }

  type NewUserResponse {
    success: Boolean!
    message: String
    user: User
  }
`;

module.exports = {
  user,
};
