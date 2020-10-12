const { gql } = require("apollo-server");

const user = gql`
  type User {
    id: ID!
    name: String
    username: String!
    email: String
    token: String
  }

  type Query {
    loggedInUser: User,
  }

  type Mutation {
    newUser(username: String!, name: String, email: String): NewUserResponse!
    login(username: String!): User!
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
