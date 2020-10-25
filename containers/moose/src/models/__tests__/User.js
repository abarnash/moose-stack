const { MongoClient } = require('mongodb');
const { User } = require('../User');
const { MONGODB_TEST_URI, REQUIRE_LOGIN_ERROR } = require('../../constants');

describe('User', () => {
  let collection, connection, db, user;

  beforeAll(async () => {
    connection = await MongoClient.connect(MONGODB_TEST_URI);
    db = await connection.db();
    collection = db.collection('users');
    user = new User(collection);
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  afterEach(async () => {
    await collection.deleteMany({});
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
    it('returns no users in the database', async () => {
      const noUsers = await user.allUsers();
      expect(noUsers).toEqual([]);
    });

    it('returns every user in the database', async () => {
      await collection.insertOne(mockUser1);
      await collection.insertOne(mockUser2);

      const allUsers = await user.allUsers();
      expect(allUsers).toEqual([mockUser1, mockUser2]);
    });
  });

  describe('createUser', () => {
    it('inserts a user into the database', async () => {
      const newUserResponse = await user.createUser(mockUser1);
      expect(newUserResponse.success).toEqual(true);
      expect(newUserResponse.message).toEqual(`New user with username "${mockUser1.username}" created!`);
      expect(newUserResponse.user.username).toEqual(mockUser1.username);

      const users = await collection.find({ username: mockUser1.username }).toArray();
      expect(users.length).toEqual(1);
    });

    it('does not insert a user with an existing username', async () => {
      await collection.insertOne(mockUser1);

      const newUserResponse = await user.createUser(mockUser1);
      expect(newUserResponse.success).toEqual(false);
      expect(newUserResponse.message).toEqual(`User with username "${mockUser1.username}" already exists!`);
      expect(newUserResponse.user).toBeUndefined();

      const users = await collection.find({ username: mockUser1.username }).toArray();
      expect(users.length).toEqual(1);
    });
  });

  describe('findUserByUsername', () => {
    beforeEach(async () => {
      await collection.insertOne(mockUser1);
    });

    it('returns no user if the user does not exist in the database', async () => {
      const noUser = await user.findUserByUsername('fake-username');
      expect(noUser).toBeNull();
    });

    it('returns no user if the user id is provided', async () => {
      const existingUser = await user.findUserByUsername(mockUser1.id);
      expect(existingUser).toBeNull();
    });

    it('returns the user in the database that matches the provided username', async () => {
      const existingUser = await user.findUserByUsername(mockUser1.username);
      expect(existingUser).toEqual(mockUser1);
    });
  });

  describe('findUserFromContext', () => {
    it('returns no user if there is no context', async () => {
      const noUser = await user.findUserFromContext();
      expect(noUser).toBeUndefined();
    });

    it('returns no user if context does not have a requireLogin field', async () => {
      user.initialize({ context: { } });

      const noUser = await user.findUserFromContext();
      expect(noUser).toBeUndefined();
    });

    it('returns no user if the user is not found in context', async () => {
      user.initialize({ context: { requireLogin: null } });

      const noUser = await user.findUserFromContext();
      expect(noUser).toBeNull();
    });

    it('returns no user if the user is not found in context and an error is returned', async () => {
      user.initialize({ context: { requireLogin: REQUIRE_LOGIN_ERROR } });

      const noUser = await user.findUserFromContext();
      expect(noUser).toBeNull();
    });

    it('returns the user if found in context', async () => {
      user.initialize({ context: { requireLogin: mockUser1 } });

      const loggedInUser = await user.findUserFromContext();
      expect(loggedInUser).toEqual(mockUser1);
    });
  });
});
