const skipperCloudinary = require('skipper-cloudinary-v2');

module.exports = {
  friendlyName: 'Delete on Cloudinary',
  description: 'Delete a picture on Cloudinary.',

  inputs: {
    publicId: {
      type: 'string',
      friendlyName: 'Public Id',
      required: true
    }
  },

  fn: function(inputs, exits) {
    const { publicId } = inputs;
    const fileAdapter = skipperCloudinary({
      cloud_name: sails.config.custom.cloudinaryCloudName,
      api_key: sails.config.custom.cloudinaryApiKey,
      api_secret: sails.config.custom.cloudinaryApiSecret
    });

    fileAdapter.rm(publicId)
      .then(result => exits.success(result))
      .catch(err => exits.error(err));
  }
}