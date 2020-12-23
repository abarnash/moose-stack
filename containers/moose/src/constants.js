const MONGODB_SERVICE_HOST = "localhost";
const MONGODB_SERVICE_PORT = 27017;

const MONGODB_URI = `mongodb://${MONGODB_SERVICE_HOST}:${MONGODB_SERVICE_PORT}/moose`;
const MONGODB_TEST_URI = `${MONGODB_URI}-test`;

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

module.exports = Object.freeze({
    MONGODB_URI,
    MONGODB_TEST_URI,
    REQUIRE_LOGIN_ERROR,
    REQUIRE_JOINED_GAME_ERROR,
});
