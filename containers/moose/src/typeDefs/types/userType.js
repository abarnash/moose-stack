const { gql } = require("apollo-server");

const userType = gql`
  type User {
    id: ID!
    name: String
    username: String!
    email: String
  }
`;

module.exports = {
  userType,
};
