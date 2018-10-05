const { Transform } = require('stream');
const inherits = require('util').inherits;

function UploadStream(opts = {}) {
  if (!(this instanceof UploadStream)) {
    return new UploadStream(opts);
  }

  Transform.call(this, opts)
}

inherits(UploadStream, Transform);

UploadStream.prototype._transform = function(data, encoding, cb) {
  if (!this.buffer) {
    this.buffer = Buffer.from(data)
  } else {
    this.buffer = Buffer.concat([ this.buffer, data ]);
  }

  cb()
}

UploadStream.prototype._flush = function(cb) {
  cb()
}

module.exports = UploadStream;