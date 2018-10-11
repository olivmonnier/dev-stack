/**
 * FileController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
  index: function (req,res){

    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
    '<form action="http://localhost:1337/file/upload" enctype="multipart/form-data" method="post">'+
    '<input type="file" name="avatar" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
    )
  },
  upload: async function  (req, res) {
    const skipperDropbox = require('skipper-dropbox');
    const fileAdapter = skipperDropbox({
      accessToken: sails.config.custom.dropboxAccessToken
    });
    const files = await sails.helpers.uploadDropbox(
      req, 'avatar'
    );
  
    console.log('files', files);

    const list = await fileAdapter.ls();
    console.log('list', list)

    const result = await fileAdapter.rm(files[0].filename);
    console.log('result', result);

    return res.send('ok')
  }
};

