const { MongoClient } = require('mongodb');

const { User } = require("../User");

describe('User', () => {
  let collection, connection, db, user;

  beforeAll(async () => {
    const MONGODB_SERVICE_HOST = "localhost";
    const MONGODB_SERVICE_PORT = "27017";

    const mongoPort = parseInt(MONGODB_SERVICE_PORT);
    const mongoUri = `mongodb://${MONGODB_SERVICE_HOST}:${mongoPort}/testing`;

    connection = await MongoClient.connect(mongoUri);
    db = await connection.db();
    collection = db.collection("users");
    user = new User(collection);
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  const mockUser1 = {
    _id: 'user1-id',
    name: 'John',
    username: 'johndoe',
    email: 'johndoe@gmail.com',
  };

  const mockUser2 = {
    _id: 'user2-id',
    name: 'Jane',
    username: 'janedoe',
    email: 'janedoe@gmail.com',
  };

  describe('allUsers', () => {
    it('should return no users in the database', async () => {
      const noUsers = await user.allUsers();
      expect(noUsers).toEqual([]);
    });

    it('should return every user in the database', async () => {
      await collection.insertOne(mockUser1);
      await collection.insertOne(mockUser2);

      const allUsers = await user.allUsers();
      expect(allUsers).toEqual([mockUser1, mockUser2]);
    });
  });
});
