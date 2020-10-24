## No http auth header needed

```
mutation AddUser {
  newUser(username: "newest-user", name: "Newest User", email: "newest-user@gmail.com") {
    success
    message
    user {
      username
      currentGameUrl
    }
  }
}
```

```json
{
  "data": {
    "newUser": {
      "success": true,
      "message": "New user with username \"newest-user\" created!",
      "user": {
        "username": "newest-user",
        "currentGameUrl": null
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
      "success": true,
      "message": "Successfully logged in as \"newest-user\"",
      "authenicationToken": "bmV3ZXN0LXVzZXI="
    }
  }
}
```
_Error: Bad username_

```json
{
  "data": {
    "login": {
      "success": false,
      "message": "Cannot find user with username \"not-a-user\"",
      "authenicationToken": null
    }
  }
}
```

## HTTP auth header required (pulled from login response)

```json
{
  "authorization": "bmV3ZXN0LXVzZXI="
}
```

```
query GetLoggedInUser {
  loggedInUser {
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
      "username": "newest-user",
      "name": "Newest User",
      "email": "newest-user@gmail.com",
      "currentGameUrl": null
    }
  }
}
```
_Error: No authentication header provided_
```json
{
  "data": {
    "loggedInUser": null
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
    "newGame": {
      "success": true,
      "message": "New game with url \"vowel-thin\" created!",
      "game": {
        "url": "vowel-thin",
        "users": [
          {
            "username": "newest-user",
            "drinksInPot": 0
          }
        ]
      }
    }
  }
}
```

_Error: Invalid user authorization header_

```json
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

```
query GetGame {
  game(url: "vowel-thin") {
    startTime
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
      "startTime": "1603571597357",
      "createdBy": {
        "username": "newest-user"
      },
      "users": [
        {
          "username": "newest-user",
          "drinksInPot": 0
        }
      ]
    }
  }
}
```

```
mutation JoinGame {
  joinGame(url: "vowel-thin") {
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
      "message": "User newest-user has joined game vowel-thin",
      "success": true,
      "game": {
        "url": "vowel-thin",
        "users": [
          {
            "username": "newest-user",
            "drinksInPot": 0
          }
        ]
      }
    }
  }
}
```

_Error: Invalid game url_

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

_Error: Invalid user authorization header_

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
      "message": "User newest-user has left the game"
    }
  }
}
```


_Error: Logged in user not in any games_

```json
{
  "data": {
    "leaveGame": {
      "success": false,
      "message": "User newest-user is not in any games"
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
      "message": "User newest-user has poured 5 drinks into the pot"
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
      "message": "User newest-user is not in any games"
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
      "message": "User newest-user already poured 5 drinks into the pot"
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
  emptyPot {
    success
    message
  }
}

```json
{
  "data": {
    "emptyPot": {
      "success": true,
      "message": "User newest-user has drank 5 drinks"
    }
  }
}
```

_Error: Logged in user not in any games_

```json
{
  "data": {
    "emptyPot": {
      "success": false,
      "message": "User newest-user is not in any games"
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

_Pot is empty_

```json
{
  "data": {
    "emptyPot": {
      "success": false,
      "message": "There are no drinks in the pot"
    }
  }
}
```

