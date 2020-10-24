const usersResolvers = {
  Query: {
    loggedInUser: async (_, __, { dataSources }) => dataSources.users.findUser(),
    allUsers : async (_, __, { dataSources }) => dataSources.users.allUsers(),
  },
  Mutation: {
    newUser: async (_, { username, name, email }, { dataSources }) => {
      const db = dataSources.users
      const existingUser = await db.findUser({ username })

      if (existingUser){
        return {
          success: false,
          message: `User with username "${username}" already exists!`
        }
      }

      const user = await db.createUser({ username, name, email })

      return {
        success: true,
        message: `New user with username "${user.username}" created!`,
        user
      };
    },
    login: async (_, { username }, { dataSources }) => {
      const user = await dataSources.users.findUser({ username });

      if (user) {
        user.token = Buffer.from(username).toString('base64');

        return user;
      }
    },
    joinGame: async (_, { url }, { dataSources }) => {
      const game = await dataSources.games.findGame(url)

      if (!game) {
        return {
          success: false,
          message: `Cannot find game with url "${url}"`,
        }
      }

      return await dataSources.users.joinGame(game)
    },
    leaveGame: async (_, __, { dataSources }) => dataSources.users.leaveGame(),
  },
  User: {
    drinksInPot: async (user, _, { dataSources }) => dataSources.bids.findBid(user.username, user.currentGameUrl),
  }
};

module.exports = {
  usersResolvers,
}
