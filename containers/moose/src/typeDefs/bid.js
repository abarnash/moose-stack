const { gql } = require("apollo-server");

const bid = gql`
  type Bid {
    id: ID!
    username: String!
    gameUrl: String!
    drinks: Int!
    inPot: Boolean!
  }

  type BidResponse {
    success: Boolean!
    message: String
    game: Game
  }

  type EmptyPotResponse {
    success: Boolean!
    message: String
    game: Game
  }
`;

module.exports = {
  bid,
};
