const { query } = require("./query");
const { mutation } = require("./mutation");
const { bookType, userType } = require("./types");

const typeDefs = [query, mutation, bookType, userType];

module.exports = {
  typeDefs,
};
