const randomWords = require('random-words');
const { v4 } = require('uuid');
const { DataSource } = require('apollo-datasource');

class Game extends DataSource {
  constructor(collection) {
    super()
    this.collection = collection
  }

  initialize(config) {
    this.context = config.context;
  }

  async createGame() {
    const url = randomWords(2).join("-")
    const createdBy = this.context && this.context.user;
    const startTime = Date.now();

    return await this.collection.insertOne({ url, createdBy, startTime, id: v4() }).then(({ ops }) => ops[0])
  }

  async findGame(url) {
    return await this.collection.findOne({ url })
  }
}

module.exports = {
  Game,
};
