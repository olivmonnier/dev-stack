const skipperDropbox = require('@dev/skipper-dropbox');

module.exports = {
  friendlyName: 'Download on Dropbox',
  description: 'Download a file on Dropbox.',

  inputs: {
    id: {
      type: 'string',
      description: 'File id to download',
      required: true 
    }
  },

  fn: async function(inputs, exits) {
    const { id } = inputs;
    const fileAdapter = skipperDropbox({
      accessToken: sails.config.custom.dropboxAccessToken
    });
    const fileMeta = await fileAdapter.find(id);
    const result = await fileAdapter.download({ path: fileMeta.path_lower })
    
    exits.success(result);
  }
}