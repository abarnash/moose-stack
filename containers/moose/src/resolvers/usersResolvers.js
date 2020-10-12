const usersResolvers = {
  Query: {
    user: async (_, { username }, { dataSources }) => {
      const existingUser = await dataSources.users.findUser({ username });

      return existingUser;
    }
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
      }

    }
  },
};

module.exports = {
  usersResolvers,
}
