const gamesResolvers = {
  Query: {
    game: async (_, { url }, { dataSources }) => dataSources.games.findGame(url)
  },
  Mutation: {
    newGame: async (_, __, { dataSources }) => {
      const game = await dataSources.games.createGame()

      return {
        success: true,
        message: `New game with url "${game.url}" created!`,
        game
      };
    },
  },
};

module.exports = {
  gamesResolvers,
}
