const { gql } = require("apollo-server");

const user = gql`
  type User {
    id: ID!
    name: String
    username: String!
    email: String
  }

  type Query {
    user(username: String!): User,
  }

  type Mutation {
    newUser(username: String!, name: String, email: String): NewUserResponse!
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
