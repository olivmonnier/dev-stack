/**
 * Module dependencies
 */

const Writable = require('stream').Writable;
const _ = require('lodash');
const cloudinary = require('cloudinary').v2;

/**
 * skipper-cloudinary-v2
 * 
 * @param {Object} globalOpts
 * @return {Object}
 */

module.exports = function (globalOpts = {}) {
  _.defaults(globalOpts, {
    cloud_name: '',
    api_key: '',
    api_secret: ''
  });

  const adapter = {
    ls(dirname, cb) {
      const mergedOptions = Object.assign({}, globalOpts, opts);
      const c = cloudinary.configure(mergedOptions);

      c.api.resources(Object.assign({}, { type: 'upload'}, dirname ? { prefix: dirname } : {}), function(err, result) {
        if (err) return cb(err);

        cb(null, result);
      });
    },
    rm(fd, cb) {
      const mergedOptions = Object.assign({}, globalOpts, opts);
      const c = cloudinary.configure(mergedOptions);

      c.uploader.destroy(fd, { invalidate: true }, function(err, result) {
        if (err) return cb(err);

        return cb();
      });
    },
    read(fd, cb) {
      const mergedOptions = Object.assign({}, globalOpts, opts);
      const c = cloudinary.configure(mergedOptions);

      c.api.resources_by_ids([fd], function(err, result) {
        if (err) return cb(err);

        cb(null, result)
      })
    },
    receive(opts) {
      const mergedOptions = Object.assign({}, globalOpts, opts);
      const c = cloudinary.configure(mergedOptions);
      const receiver__ = Writable({
        objectMode: true
      });

      receiver__._write = function onFile(file, encoding, done) {
        const stream = c.uploader.upload_stream({}, (err, file) => {
          if (err) return receiver__.emit('error', new Error(err.message));

          done();
        });

        stream.on('error', function(error) {
          done(error);
        });

        file.pipe(stream);
      }

      return receiver__;
    }
  }

  return adapter;
}