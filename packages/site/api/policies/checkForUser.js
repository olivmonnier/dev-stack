
/**
 * checkForUser
 *
 * @module      :: Policy
 * @description :: Simple policy to load an authenticated user, if any.  If we're not logged in, just continue.
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  sails.helpers.verifyToken({
    req, res
  })
  .switch({
    error: function(err) {
      return res.serverError(err)
    },
    invalid: function(err) {
      return next()
    },
    success: function() {
      return next()
    }
  })
}