const skipperDropbox = require('skipper-dropbox');

module.exports = {
  friendlyName: 'Upload on Dropbox',
  description: 'Upload a file on Dropbox.',

  inputs: {
    req: {
      type: 'ref',
      friendlyName: 'Request',
      description: 'A reference to the request object (req).',
      required: true
    },
    name: {
      type: 'string',
      required: true
    }
  },

  fn: function(inputs, exits) {
    const { req, name } = inputs;

    req.file(name).upload({
      adapter: skipperDropbox,
      accessToken: sails.config.custom.dropboxAccessToken
    }, function(err, result) {
      if (err) return exits.error(err);

      return exits.success(result);
    });
  }
}