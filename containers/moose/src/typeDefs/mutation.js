const { gql } = require("apollo-server");

const mutation = gql`
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
  mutation,
};
