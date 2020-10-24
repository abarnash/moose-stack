const { query } = require("./query");
const { mutation } = require("./mutation");
const { user } = require("./user");
const { game } = require("./game");

const typeDefs = [query, mutation, user, game];

module.exports = {
  typeDefs,
};
