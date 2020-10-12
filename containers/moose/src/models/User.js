const { v4 } = require('uuid');
const { DataSource } = require('apollo-datasource');

class User extends DataSource {
  constructor(collection) {
    super()
    this.collection = collection
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

  async createUser({ username, name, email }) {
    return await this.collection.insertOne({ username, name, email, id: v4() }).then(({ ops }) => ops[0])
  }

  async findUser({ username } = {}) {
    return await this.collection.findOne({ username })
  }
}

module.exports = {
  User,
};
