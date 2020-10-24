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
    return await this.collection.insertOne({ username, name, email, id: v4() }).then(({ ops }) => ops[0]);
  }

  async findUser(username) {
    return await this.collection.findOne({ username });
  }

  async findUserFromContext() {
    return await this.collection.findOne({ username: this.context?.user?.username });
  }

  async joinGame(game) {
    const currentUser = this.context && this.context.user;

    if (!currentUser) {
      return {
        success: false,
        message: "User must be logged in to perform this action",
      };
    }

    this.collection.findOneAndUpdate(
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
    const currentUser = this.context && this.context.user;

    if (!currentUser) {
      return {
        success: false,
        message: "User must be logged in to perform this action",
      };
    }

    const currentGameUrl = currentUser.currentGameId;

    if (!currentGameUrl) {
      return {
        success: false,
        message: `User ${currentUser.username} is not in any games`,
      };
    }

    this.collection.findOneAndUpdate(
      { id: currentUser.id },
      { $set: { currentGameId: null } },
      { returnNewDocument: true }
    );

    return {
      success: true,
      message: `User ${currentUser.username} has left the game`,
    };
  }
}

module.exports = {
  User,
};
