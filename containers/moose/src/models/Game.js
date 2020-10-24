const randomWords = require('random-words');
const { v4 } = require('uuid');
const { DataSource } = require('apollo-datasource');

class Game extends DataSource {
  constructor(collection) {
    super();
    this.collection = collection;
  }

  initialize(config) {
    this.context = config.context;
  }

  async createGame() {
    const url = randomWords(2).join("-");
    const startTime = Date.now();
    const currentUser = this.context?.requireLogin;

    if (currentUser.error) return currentUser.error;

    const game = await this.collection.insertOne({
      url,
      createdBy: currentUser,
      startTime,
      id: v4(),
    }).then(({ ops }) => ops[0]);

    return {
      success: true,
      message: `New game with url "${game.url}" created!`,
      game,
    };
  }

  async findGameByUrl(url) {
    return await this.collection.findOne({ url });
  }

  async findGame(id) {
    return await this.collection.findOne({ id: id });
  }
}

module.exports = {
  Game,
};
