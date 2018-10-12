const skipperDropbox = require('skipper-dropbox');

module.exports = {
  friendlyName: 'Delete on Dropbox',
  description: 'Delete a file on Dropbox.',

  inputs: {
    path: {
      type: 'string',
      description: 'File path to delete',
      required: true 
    }
  },

  fn: function(inputs, exits) {
    const { path } = inputs;
    const fileAdapter = skipperDropbox({
      accessToken: sails.config.custom.dropboxAccessToken
    });

    fileAdapter.rm(path)
      .then(result => exits.success(result))
      .catch(err => exits.error(err));
  }
}