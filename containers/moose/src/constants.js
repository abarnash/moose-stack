const MONGODB_SERVICE_HOST = "localhost";
const MONGODB_SERVICE_PORT = 27017;

const MONGODB_URI = `mongodb://${MONGODB_SERVICE_HOST}:${MONGODB_SERVICE_PORT}/moose`;
const MONGODB_TEST_URI = `${MONGODB_URI}-test`;

module.exports = Object.freeze({
    MONGODB_URI,
    MONGODB_TEST_URI,
});
