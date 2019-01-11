const skipperDropbox = require('@dev/skipper-dropbox');

module.exports = {
  friendlyName: 'Delete on Dropbox',
  description: 'Delete a file on Dropbox.',

  inputs: {
    ids: {
      type: 'ref',
      description: 'File ids to delete',
      required: true 
    }
  },

  fn: function(inputs, exits) {
    const { ids } = inputs;
    const fileAdapter = skipperDropbox({
      accessToken: sails.config.custom.dropboxAccessToken
    });

    if (Array.isArray(ids)) {
      return Promise.all(ids.map(id => {
        return fileAdapter
          .find(id)
          .then(file => fileAdapter.rm(file.path_lower))
      }))
      .then(result => exits.success(result))
      .catch(err => exits.error(err));
    } else {
      exits.error(new Error('Must be an array'));
    }
  }
}