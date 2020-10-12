### Getting set up

```bash
npm install
```

### Running

```bash
npm start
```

Check out the graphql playground at http://localhost:4000/

### GraphQL Queries and mutations

```gql
mutation AddUser {
  newUser(username: "test-user", name: "Test User", email: "test-user@gmail.com") {
    success
    message
    user {
      username
    }
  }
}
```

Returns the following

```json
{
  "data": {
    "newUser": {
      "success": true,
      "message": "New user with username \"test-user\" created!",
      "user": {
        "username": "test-user"
      }
    }
  }
}
```

```gql
mutation Login {
  login(username: "test-user") {
    username
    name
    token
  }
}
```

Returns the following

```json
{
  "data": {
    "login": {
      "username": "test-user",
      "name": "Test User",
      "token": "dGVzdC11c2Vy"
    }
  }
}
```

```gql
query GetUser {
  user {
    id
    name
    email
  }
}
```

Along with the authorization token from the last query provided as an http header

```json
{
  "authorization": "dGVzdC11c2VyMg=="
}
```

returns the following

```json
{
  "data": {
    "loggedInUser": {
      "id": "99400792-b740-45df-8ff4-04b94ef686b9",
      "name": "Test User",
      "email": "test-user@gmail.com"
    }
  }
}
```

