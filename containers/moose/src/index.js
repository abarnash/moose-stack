const { ApolloServer } = require('apollo-server');
const { MongoClient } = require('mongodb');

const { typeDefs } = require("./typeDefs");
const { resolvers } = require("./resolvers");

const { User } = require('./models/User');
const { Game } = require('./models/Game');
const { Bid } = require('./models/Bid');

const {
  MONGODB_SERVICE_HOST = 'localhost',
  MONGODB_SERVICE_PORT = '27017'
} = process.env
const mongoPort = parseInt(MONGODB_SERVICE_PORT)
const mongoUri = `mongodb://${MONGODB_SERVICE_HOST}:${mongoPort}/accounts`
const client = new MongoClient(mongoUri)

const connect = async () => {
  await client.connect()
  console.log('Connected to mongodb.')
}
connect()


const dataSources = () => ({
  users: new User(client.db().collection('users')),
  games: new Game(client.db().collection('games')),
  bids: new Bid(client.db().collection('bids')),
});

const context = async ({ req }) => {
  // Simple auth check on every request based on the username provided in the header
  const auth = (req.headers && req.headers.authorization) || '';
  const username = Buffer.from(auth, 'base64').toString('ascii');
  const user = await client.db().collection('users').findOne({ username });

  return { user };
};

const server = new ApolloServer({ typeDefs, resolvers, dataSources, context });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
