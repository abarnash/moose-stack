const { gql } = require("apollo-server");

const query = gql`
  type Query {
    books: [Book]
    user(username: String!): User,
  }
`;

module.exports = {
  query,
};
