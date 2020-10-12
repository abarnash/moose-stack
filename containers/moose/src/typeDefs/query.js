const { gql } = require("apollo-server");

const query = gql`
  type Query {
    user(username: String!): User,
  }
`;

module.exports = {
  query,
};
