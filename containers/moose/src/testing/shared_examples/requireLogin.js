
const { errorUserContext } = require('../utils');
const { REQUIRE_LOGIN_ERROR } = require('../../constants');

const itBehavesLikeRequiresLogin = args => {
  const { subject, params, datastore } = args;

  describe("requireLogin", () => {
    it("fails if a user is not logged in", () => {
      datastore.initialize(errorUserContext);

      const response = params ? subject(params) : subject();
      expect(response).toEqual(REQUIRE_LOGIN_ERROR);
    });
  });
};

module.exports = {
  itBehavesLikeRequiresLogin,
};
