const { gql } = require("apollo-server");

const game = gql`
  type Game {
    id: ID!
    url: String!
    creatingUser: User!
    startTime: String!
    endTime: String
    users: [User]!
  }

  type NewGameResponse {
    success: Boolean!
    message: String
    game: Game
  }
`;

module.exports = {
  game,
};
