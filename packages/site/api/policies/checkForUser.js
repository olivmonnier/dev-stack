
/**
 * checkForUser
 *
 * @module      :: Policy
 * @description :: Simple policy to load an authenticated user, if any.  If we're not logged in, just continue.
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

module.exports = function(req, res, next) {
  sails.helpers.verifyToken(req)
    .switch({
      error: function(err) {
        return res.serverError(err)
      },
      invalid: function(err) {
        return next(err)
      },
      success: function() {
        return next()
      }
    })
}