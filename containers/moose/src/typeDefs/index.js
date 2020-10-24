const { query } = require("./query");
const { mutation } = require("./mutation");
const { user } = require("./user");
const { game } = require("./game");
const { bid } = require("./bid");

const typeDefs = [query, mutation, user, game, bid];

module.exports = {
  typeDefs,
};
