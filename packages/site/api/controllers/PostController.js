/**
 * PostController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
  index: function (req,res){

    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
    '<form action="http://localhost:1337/post/upload" enctype="multipart/form-data" method="post">'+
    '<input type="file" name="avatar" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
    )
  },
  upload: function  (req, res) {
    req.file('avatar').upload({
      adapter: require('skipper-dropbox'),
      accessToken: 'on_uhKWVfXAAAAAAAAAAbqM9E0rpfrRLQtcjetJnVBCsf1BUJH64fihRIl8XzHp4'
    }, function (err, files) {
      if (err) {
        return res.serverError(err);
      }

      return res.json({
        message: files.length + ' file(s) uploaded successfully!',
        files: files
      });
    });
  }
};

