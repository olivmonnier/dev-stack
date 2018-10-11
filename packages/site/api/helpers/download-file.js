const skipperDropbox = require('skipper-dropbox');

module.exports = {
  friendlyName: 'Download on Dropbox',
  description: 'Download a file on Dropbox.',

  inputs: {
    res: {
      type: 'ref',
      friendlyName: 'Response',
      description: 'A reference to the response object (res).',
      required: true
    },
    path: {
      type: 'string',
      description: 'File path to delete',
      required: true 
    }
  },

  fn: function(inputs, exits) {
    const { path, res } = inputs;
    const fileAdapter = skipperDropbox({
      accessToken: sails.config.custom.dropboxAccessToken
    });

    fileAdapter.download(path)
      .then(result => {
        res.set('Content-Disposition', 'attachment; filename=' + result.name);
        res.send(new Buffer(result.fileBinary, 'binary'));
        return exits.success(result);
      })
      .catch(err => exits.error(err))
  }
}