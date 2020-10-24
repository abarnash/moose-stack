const gamesResolvers = {
  Query: {
    game: async (_, { url }, { dataSources }) => dataSources.games.findGame(url)
  },
  Mutation: {
    newGame: async (_, __, { dataSources }) => dataSources.games.createGame(),
  },
  Game: {
    users: async (game, _, { dataSources }) => dataSources.users.inGame(game.url),
  },
};

module.exports = {
  gamesResolvers,
}
