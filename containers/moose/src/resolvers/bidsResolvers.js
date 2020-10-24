const bidsResolvers = {
  Mutation: {
    addBid: async (_, { drinks }, { dataSources }) => dataSources.bids.addBid(drinks),
    emptyPot: async (_, { gameUrl }, { dataSources }) => dataSources.bids.emptyPot(gameUrl),
  },
};

module.exports = {
  bidsResolvers,
}
