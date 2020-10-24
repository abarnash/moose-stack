const { v4 } = require('uuid');
const { DataSource } = require('apollo-datasource');

class Bid extends DataSource {
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

  async addBid(drinks) {
    const currentUser = this.context && this.context.user;

    if (!currentUser) {
      return {
        success: false,
        message: "User must be logged in to perform this action",
      };
    }

    const currentGameId = currentUser.currentGameId;

    if (!currentGameId) {
      return {
        success: false,
        message: `User ${currentUser.username} is not in any games`,
      };
    }

    const existingBid = await this.collection.findOne({
      userId: currentUser.id,
      gameId: currentGameId,
      inPot: true,
    });

    if (existingBid) {
      return {
        success: false,
        message: `User ${currentUser.username} already poured ${existingBid.drinks} drinks into the pot`,
      };
    }

    if (drinks < 1) {
      return {
        success: false,
        message: `You must pour at least one drink into the pot`,
      };
    }

    const bid = await this.collection.insertOne({
      userId: currentUser.id,
      gameId: currentGameId,
      drinks,
      inPot: true,
      id: v4(),
    }).then(({ ops }) => ops[0]);

    return {
      success: true,
      message: `User ${currentUser.username} has poured ${bid.drinks} drinks into the pot`,
    };
  }

  async findBid(username, gameUrl) {
    return this.collection.findOne({ username, gameUrl, inPot: true })?.drinks || 0;
  }

  async emptyPot() {
    const currentUser = this.context && this.context.user;

    if (!currentUser) {
      return {
        success: false,
        message: "User must be logged in to perform this action",
      };
    }

    const gameId = currentUser.currentGameId;

    if (!gameId) {
      return {
        success: false,
        message: `User ${currentUser.username} is not in any games`,
      };
    }

    const currentBids = await this.collection.find({ gameId, inPot: true }).toArray();
    const numbersOfDrinks = currentBids.map(bid => bid.drinks);
    const totalDrinks = numbersOfDrinks.reduce((totalNumberOfDrinks, drinks) => totalNumberOfDrinks + drinks, 0);

    if (totalDrinks === 0) {
      return {
        success: false,
        message: `There are no drinks in the pot`,
      };
    }

    this.collection.update(
      { gameId, inPot: true },
      { $set: { inPot: false } }
    );


    return {
      success: true,
      message: `User ${currentUser.username} has drank ${totalDrinks} drinks`,
    };
  }
}

module.exports = {
  Bid,
};
