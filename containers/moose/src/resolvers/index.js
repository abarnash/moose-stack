const { usersResolvers } = require('./usersResolvers');
const { gamesResolvers } = require('./gamesResolvers');
const { bidsResolvers } = require('./bidsResolvers');

const resolvers = [usersResolvers, gamesResolvers, bidsResolvers];

module.exports = {
  resolvers,
};
