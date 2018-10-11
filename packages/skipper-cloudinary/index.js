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
    ls(opts) {
      const c = getCloudinary(globalOpts);
      const o = typeof opts === 'string' 
        ? { type: 'upload', dirname: opts }
        : opts;

      return new Promise((resolve, reject) => {
        c.api.resources(o, function(err, result) {
          if (err) return reject(err);
  
          resolve(result);
        });
      })
    },

    rm(fd) {
      const c = getCloudinary(globalOpts);

      return new Promise((resolve, reject) => {
        c.uploader.destroy(fd, { invalidate: true }, function(err, result) {
          if (err) return reject(err);
  
          resolve(result);
        });
      })
    },

    read(fd) {
      const c = getCloudinary(globalOpts);

      return new Promise((resolve, reject) => {
        c.api.resource(fd, function(err, result) {
          if (err) return reject(err);
  
          resolve(result);
        })
      })
    },
    receive(opts) {
      const mergedOptions = Object.assign({}, globalOpts, opts);
      const c = getCloudinary(mergedOptions);
      const receiver__ = Writable({
        objectMode: true
      });

      receiver__._write = function onFile(file, encoding, done) {
        const stream = c.uploader.upload_stream({}, (err, result) => {
          if (err) return receiver__.emit('error', new Error(err.message));

          file.extra = result;

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

function getCloudinary(opts) {
  cloudinary.config(opts);

  return cloudinary;
}