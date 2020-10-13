## No http auth header needed

mutation AddUser {
  newUser(username: "test-user10", name: "Test User", email: "test-user@gmail.com") {
    success
    message
    user {
      username
    }
  }
}

{
  "data": {
    "newUser": {
      "success": true,
      "message": "New user with username \"test-user\" created!",
      "user": {
        "username": "test-user",
        "name": "Test User"
      }
    }
  }
}

mutation Login {
  login(username: "test-user") {
    token
  }
}

{
  "data": {
    "login": {
      "token": "dGVzdC11c2Vy"
    }
  }
}

## HTTP auth header required (pulled from login response)

{
  "authorization": "dGVzdC11c2Vy"
}

query GetLoggedInUser {
  loggedInUser {
    id
    username
    name
    email
    currentGameUrl
  }
}

{
  "data": {
    "loggedInUser": {
      "id": "99400792-b740-45df-8ff4-04b94ef686b9",
      "username": "test-user",
      "name": "Test User",
      "email": "test-user@gmail.com",
      "currentGameUrl": "grandfather-seven"
    }
  }
}

mutation AddGame {
  newGame {
    success
    message
    game {
      url
    }
  }
}

{
  "data": {
    "newGame": {
      "success": true,
      "message": "New game with username \"what-coat\" created!",
      "game": {
        "url": "what-coat"
      }
    }
  }
}

query GetGame {
  game(url: "what-coat") {
    startTime
    createdBy {
      username
    }
  }
}

{
  "data": {
    "game": {
      "startTime": "1602544727872",
      "createdBy": {
        "username": "test-user"
      }
    }
  }
}


mutation JoinGame {
  joinGame(url: "what-coat") {
    message
    success
    user {
      currentGameUrl
    }
  }
}

{
  "data": {
    "joinGame": {
      "message": "User test-user has joined game grandfather-seven",
      "success": true
    }
  }
}

### Errors

{
  "data": {
    "joinGame": {
      "message": "Cannot find game with url \"grandfather\"",
      "success": false
    }
  }
}

{
  "data": {
    "joinGame": {
      "message": "User must be logged in to perform this action",
      "success": false
    }
  }
}