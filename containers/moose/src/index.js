const { ApolloServer } = require('apollo-server');
const { MongoClient } = require('mongodb');

const { typeDefs } = require("./typeDefs");
const { resolvers } = require("./resolvers");
const { User } = require('./models/User');

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
});

const server = new ApolloServer({ typeDefs, resolvers, dataSources });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
