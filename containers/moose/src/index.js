const { ApolloServer } = require("apollo-server");
const { MongoClient } = require("mongodb");

const { typeDefs } = require("./typeDefs");
const { resolvers } = require("./resolvers");

const { User } = require("./models/User");
const { Game } = require("./models/Game");
const { Bid } = require("./models/Bid");

const { MONGODB_URI } = require("./constants");

const REQUIRE_LOGIN_ERROR = {
  error: {
    success: false,
    message: "User must be logged in to perform this action",
  },
};

const REQUIRE_JOINED_GAME_ERROR = {
  error: {
    success: false,
    message: "User must be logged in to perform this action",
  },
};

const client = new MongoClient(MONGODB_URI);

const connect = async () => {
  await client.connect();
  console.log("Connected to mongodb.");
};
connect();

const dataSources = () => ({
  users: new User(client.db().collection("users")),
  games: new Game(client.db().collection("games")),
  bids: new Bid(client.db().collection("bids")),
});

const context = async ({ req }) => {
  // Simple auth check on every request based on the username provided in the header
  const auth = (req.headers && req.headers.authorization) || "";
  const username = Buffer.from(auth, "base64").toString("ascii");
  const currentUser = await client.db().collection("users").findOne({ username });
  const currentGame = await client.db().collection("games").findOne({ id: currentUser?.currentGameId });
  const requireLogin = currentUser ? currentUser : REQUIRE_LOGIN_ERROR;
  const requireJoinedGame = currentGame ? currentGame : REQUIRE_JOINED_GAME_ERROR;

  return { requireLogin, requireJoinedGame };
};

const server = new ApolloServer({ typeDefs, resolvers, dataSources, context });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
