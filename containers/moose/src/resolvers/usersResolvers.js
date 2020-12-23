const usersResolvers = {
  Query: {
    loggedInUser: async (_, __, { dataSources }) => dataSources.users.findUserFromContext(),
    allUsers : async (_, __, { dataSources }) => dataSources.users.allUsers(),
  },
  Mutation: {
    newUser: async (_, { username, name, email }, { dataSources }) => dataSources.users.createUser({ username, name, email }),
    login: async (_, { username }, { dataSources }) => dataSources.users.login(username),
    joinGame: async (_, { url }, { dataSources }) => {
      const game = await dataSources.games.findGameByUrl(url);

      if (!game) {
        return {
          success: false,
          message: `Cannot find game with url "${url}"`,
        };
      }

      return await dataSources.users.joinGame(game);
    },
    leaveGame: async (_, __, { dataSources }) => dataSources.users.leaveGame(),
  },
  User: {
    drinksInPot: async (user, _, { dataSources }) => dataSources.bids.findBid(user.username, user.currentGameUrl),
    currentGameUrl: async (user, _, { dataSources }) => {
      const currentGame = await dataSources.games.findGame(user.currentGameId);

      return currentGame?.url;
    },
  },
};

module.exports = {
  usersResolvers,
};
