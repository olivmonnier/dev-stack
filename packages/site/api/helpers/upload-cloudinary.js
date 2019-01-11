const skipperCloudinary = require('@dev/skipper-cloudinary');

module.exports = {
  friendlyName: 'Upload on Cloudinary',
  description: 'Upload a file on Cloudinary service',

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
      adapter: skipperCloudinary,
      cloud_name: sails.config.custom.cloudinaryCloudName,
      api_key: sails.config.custom.cloudinaryApiKey,
      api_secret: sails.config.custom.cloudinaryApiSecret
    }, function(err, result) {
      if (err) return exits.error(err);

      return exits.success(result);
    })
  }
}