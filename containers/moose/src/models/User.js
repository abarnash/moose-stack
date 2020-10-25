const { v4 } = require('uuid');
const { DataSource } = require('apollo-datasource');

class User extends DataSource {
  constructor(collection) {
    super();
    this.collection = collection;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

  async allUsers() {
    return await this.collection.find({ }).toArray();
  }

  async createUser({ username, name, email }) {
    const existingUser = await this.findUserByUsername(username);

    if (existingUser) {
      return {
        success: false,
        message: `User with username "${username}" already exists!`,
      };
    }

    const user = await this.collection.insertOne({ username, name, email, id: v4() }).then(({ ops }) => ops[0]);

    return {
      success: true,
      message: `New user with username "${user.username}" created!`,
      user,
    };
  }

  async findUserByUsername(username) {
    return await this.collection.findOne({ username });
  }

  async findUserFromContext() {
    const currentUser = this.context?.requireLogin;

    if (currentUser?.error) return null;

    return currentUser;
  }

  async login(username) {
    const user = await this.findUserByUsername(username);

    if (!user) {
      return {
        success: false,
        message: `Cannot find user with username "${username}"`,
      };
    }


    return {
      success: true,
      message: `Successfully logged in as "${username}"`,
      authenicationToken: Buffer.from(username).toString('base64'),
    };
  }

  async joinGame(game) {
    const currentUser = this.context?.requireLogin;

    if (currentUser.error) return currentUser.error;

    await this.collection.findOneAndUpdate(
      { id: currentUser.id },
      { $set: { currentGameId: game.id } }
    );

    return {
      success: true,
      message: `User ${currentUser.username} has joined game ${game.url}`,
      game,
    };
  }

  async findUsersInGame(gameId) {
    return await this.collection.find({ currentGameId: gameId }).toArray();
  }

  async leaveGame() {
    const currentUser = this.context?.requireLogin;
    const currentGame = this.context?.requireJoinedGame;

    if (currentUser.error) return currentUser.error;
    if (currentGame.error) return currentGame.error;

    this.collection.findOneAndUpdate(
      { id: currentUser.id },
      { $set: { currentGameId: null } },
      { returnNewDocument: true }
    );

    return {
      success: true,
      message: `User ${currentUser.username} has left the game ${currentGame.url}`,
    };
  }
}

module.exports = {
  User,
};
