const { gql } = require("apollo-server");

const game = gql`
  type Game {
    id: ID!
    url: String!
    createdBy: User!
    startTime: String!
    endTime: String
    users: [User]!
  }

  type NewGameResponse {
    success: Boolean!
    message: String
    game: Game
  }

  type LeaveGameResponse {
    success: Boolean!
    message: String
  }
`;

module.exports = {
  game,
};
