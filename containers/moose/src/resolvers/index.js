const { booksResolvers } = require('./booksResolvers');
const { usersResolvers } = require('./usersResolvers');

const resolvers = [booksResolvers, usersResolvers];

module.exports = {
  resolvers,
};
