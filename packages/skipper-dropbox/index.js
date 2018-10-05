/**
 * Module dependencies
 */

const { Writable } = require('stream');
const _ = require('lodash');
const Dropbox = require('dropbox').Dropbox;
const fetch =  require('isomorphic-fetch');
const UploadStream = require('./UploadStream');

/**
 * skipper-dropbox
 * 
 * @param {Object} globalOpts
 * @return {Object}
 */

module.exports = function (globalOpts = {}) {
  _.defaults(globalOpts, {
    accessToken: ''
  });

  const adapter = {
    ls() {

    },
    rm(fd, cb) {
      const dropbox = getDropbox(globalOpts);

      dropbox.filesDeleteV2({ path: fd })
        .then(() => cb())
        .catch(err => cb(err.error));
    },
    read() {

    },
    receive(opts) {
      const mergedOptions = Object.assign({}, globalOpts, opts);
      const dropbox = getDropbox(mergedOptions);
      const receiver__ = Writable({
        objectMode: true
      });

      receiver__._write = function onFile(file, encoding, done) {
        const stream = UploadStream();

        stream.on('error', function(error) {
          receiver__.emit('error', new Error(error.message));
        });

        stream.on('finish', function(err, result) {
          dropbox.filesUpload({ path: '/' + file.filename, contents: Buffer(this.buffer, 'binary') })
            .then(fileUploaded => {
              file.extra = { 
                id: fileUploaded.id 
              };
              done();
            })
            .catch(err => done(err.error));
        });

        file.pipe(stream);
      }

      return receiver__;
    }
  }

  return adapter;
}

function getDropbox(opts) {
  return new Dropbox({ fetch, accessToken: opts.accessToken })
}