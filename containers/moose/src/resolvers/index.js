const { usersResolvers } = require('./usersResolvers');
const { gamesResolvers } = require('./gamesResolvers');

const resolvers = [usersResolvers, gamesResolvers];

module.exports = {
  resolvers,
};
