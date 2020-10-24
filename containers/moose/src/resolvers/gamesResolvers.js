const gamesResolvers = {
  Query: {
    game: async (_, { url }, { dataSources }) => dataSources.games.findGameByUrl(url),
  },
  Mutation: {
    newGame: async (_, __, { dataSources }) => {
      const createdGame = await dataSources.games.createGame();

      if (createdGame.success) {
        await dataSources.users.joinGame(createdGame.game);
      }

      return createdGame;
    },
  },
  Game: {
    users: async (game, _, { dataSources }) => {
      return dataSources.users.findUsersInGame(game.id);
    },
  },
};

module.exports = {
  gamesResolvers,
};
