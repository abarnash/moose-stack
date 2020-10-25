const { REQUIRE_LOGIN_ERROR, REQUIRE_JOINED_GAME_ERROR } = require('../constants');

const loggedInUserContext = user => ({ context: { requireLogin: user } });
const joinedGameContext = game => ({ context: { requireJoinedGame: game } });
const errorUserContext = () => ({ context: { requireLogin: REQUIRE_LOGIN_ERROR } });
const errorGameContext = () => ({ context: { requireLogin: REQUIRE_JOINED_GAME_ERROR } });

module.exports = {
  loggedInUserContext,
  joinedGameContext,
  errorUserContext,
  errorGameContext,
};
