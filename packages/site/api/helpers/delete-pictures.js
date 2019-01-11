const skipperCloudinary = require('@dev/skipper-cloudinary');

module.exports = {
  friendlyName: 'Delete on Cloudinary',
  description: 'Delete a picture on Cloudinary.',

  inputs: {
    publicIds: {
      type: 'ref',
      friendlyName: 'Public Ids',
      required: true
    }
  },

  fn: function(inputs, exits) {
    const { publicIds } = inputs;
    const fileAdapter = skipperCloudinary({
      cloud_name: sails.config.custom.cloudinaryCloudName,
      api_key: sails.config.custom.cloudinaryApiKey,
      api_secret: sails.config.custom.cloudinaryApiSecret
    });

    if (Array.isArray(publicIds)) {
      return Promise.all(publicIds.map(publicId => {
        return fileAdapter.rm(publicId);
      }))
      .then(result => exits.success(result))
      .catch(err => exits.error(err));
    } else {
      exits.error(new Error('Must be an array'));
    }
  }
}