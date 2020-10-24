## No http auth header needed

```
mutation AddUser {
  newUser(username: "test-user10", name: "Test User", email: "test-user@gmail.com") {
    success
    message
    user {
      username
    }
  }
}
```

```json
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
```

```
query GetAllUsers {
  allUsers {
    username
  }
}
```

```json
{
  "data": {
    "allUsers": [
      {
        "username": "hschallh"
      },
      {
        "username": "test-user"
      }
    ]
  }
}
```

```
mutation Login {
  login(username: "test-user") {
    token
  }
}
```

```json
{
  "data": {
    "login": {
      "token": "dGVzdC11c2Vy"
    }
  }
}
```

## HTTP auth header required (pulled from login response)

```json
{
  "authorization": "dGVzdC11c2Vy"
}
```

```
query GetLoggedInUser {
  loggedInUser {
    id
    username
    name
    email
    currentGameUrl
  }
}
```

```json
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
```

```
mutation AddGame {
  newGame {
    success
    message
    game {
      url
    }
  }
}
```

```json
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
```

### addGame Errors

_Invalid user authorization header_

{
  "data": {
    "newGame": {
      "success": false,
      "message": "User must be logged in to perform this action",
      "game": null
    }
  }
}

```
query GetGame {
  game(url: "what-coat") {
    id
    createdBy {
      username
    }
    users {
      username
      drinksInPot
    }
  }
}
```

```json
{
  "data": {
    "game": {
      "createdBy": {
        "username": "game-tester"
      },
      "users": [
        {
          "username": "game-tester",
          "drinksInPot": 0
        }
      ]
    }
  }
}
```

```
mutation JoinGame {
  joinGame(url: "what-coat") {
    message
    success
    game {
      url
      users {
        username
        drinksInPot
      }
    }
  }
}
```

```json
{
  "data": {
    "joinGame": {
      "message": "User test-user has joined game what-coat",
      "success": true,
      "game": {
        "url": "what-coat",
        "users": [
          {
            "username": "test-user",
            "drinksInPot": 0
          }
        ]
      }
    }
  }
}
```

#### `joinGame` Errors

_Invalid game url_

```json
{
  "data": {
    "joinGame": {
      "message": "Cannot find game with url \"grandfather\"",
      "success": false,
      "game": null
    }
  }
}
```

_Invalid user authorization header_

```json
{
  "data": {
    "joinGame": {
      "message": "User must be logged in to perform this action",
      "success": false,
      "game": null
    }
  }
}
```

```
mutation LeaveGame {
  leaveGame {
    success
    message
  }
}
```

```json
{
  "data": {
    "leaveGame": {
      "success": true,
      "message": "User game-tester has left the game of-idea"
    }
  }
}
```


#### `leaveGame` Errors

_Logged in user not in any games_

```json
{
  "data": {
    "leaveGame": {
      "success": false,
      "message": "User game-tester is not in any games"
    }
  }
}
```

_Invalid user authorization header_

```json
{
  "data": {
    "leaveGame": {
      "success": false,
      "message": "User must be logged in to perform this action"
    }
  }
}
```

```
mutation AddBid {
  addBid(drinks: 5) {
    success
    message
  }
}
```

```json
{
  "data": {
    "addBid": {
      "success": true,
      "message": "User game-tester has poured 5 drinks into the pot in game of-idea"
    }
  }
}
```

#### `addBid` Errors

_Logged in user not in any games_

```json
{
  "data": {
    "leaveGame": {
      "success": false,
      "message": "User game-tester is not in any games"
    }
  }
}
```

_Invalid user authorization header_

```json
{
  "data": {
    "leaveGame": {
      "success": false,
      "message": "User must be logged in to perform this action"
    }
  }
}
```

_User already poured into pot_

```json
{
  "data": {
    "addBid": {
      "success": false,
      "message": "User game-tester already poured 5 drinks into the pot in game of-idea"
    }
  }
}
```

_Bid is not greater than 0_

```json
{
  "data": {
    "addBid": {
      "success": false,
      "message": "You must pour at least one drink into the pot"
    }
  }
}
```

mutation DrinkPot {
  emptyPot(gameUrl: "of-idea") {
    success
    message
  }
}

#### `emptyPot` Errors

_Logged in user not in any games_

```json
{
  "data": {
    "leaveGame": {
      "success": false,
      "message": "User game-tester is not in any games"
    }
  }
}
```

_Invalid user authorization header_

```json
{
  "data": {
    "leaveGame": {
      "success": false,
      "message": "User must be logged in to perform this action"
    }
  }
}

_Logged in user not in provided game_

```json
{
  "data": {
    "emptyPot": {
      "success": false,
      "message": "User game-tester is not in the game not-a-real-game"
    }
  }
}
```

_Pot is empty_

```json
{
  "data": {
    "emptyPot": {
      "success": false,
      "message": "Game of-idea has no drinks in the pot"
    }
  }
}
```

