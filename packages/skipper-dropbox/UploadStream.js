const { Transform } = require('stream');
const inherits = require('util').inherits;

function UploadStream(opts = {}) {
  if (!(this instanceof UploadStream))
    return new UploadStream(opts);
  Transform.call(this, opts)
}

inherits(UploadStream, Transform);

UploadStream.prototype._transform = function(data, encoding, cb) {
  const buffer = Buffer.isBuffer(data) ? data : Buffer.from(data, encoding);
  
  this.push(buffer);
  cb();
}

module.exports = UploadStream;