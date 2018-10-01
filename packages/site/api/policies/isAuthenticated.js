
/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to require an authenticated user, or else redirect to login page
 *                 Looks for an Authorization header bearing a valid JWT token
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
const jwt = require('jsonwebtoken');

module.exports = async function(req, res, next) {
  sails.helpers.verifyToken({
    req, res
  })
  .switch({
    error: function(err) {
      return res.serverError(err)
    },
    invalid: function(err) {
      if (req.wantsJSON) {
        return res.sendStatus(401)
      }

      return res.redirect('/login')
    },
    success: function() {
      return next()
    }
  })
}