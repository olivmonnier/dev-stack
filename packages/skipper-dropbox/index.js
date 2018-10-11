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
 * @returns {Object}
 */

module.exports = function (globalOpts = {}) {
  _.defaults(globalOpts, {
    accessToken: '',
    pathFolder: '',
    limit: 10
  });

  const adapter = {
    /**
     * List files in dropbox folder
     * 
     * @returns {Promise}
     */
    ls() {
      const { pathFolder, limit } = globalOpts;
      const dropbox = getDropbox(globalOpts);

      return dropbox.filesListFolder({ path: pathFolder, limit });
    },
    /**
     * Delete file in dropbox folder
     * 
     * @param {string} filename
     * @returns {Promise}
     */
    rm(filename) {
      const { pathFolder } = globalOpts;
      const dropbox = getDropbox(globalOpts);

      return dropbox.filesDeleteV2({ path: pathFolder + '/' + filename });
    },
    /**
     * Metadata of file stored on dropbox
     * @param {string} filename 
     * @returns {Promise}
     */
    read(filename) {
      const { pathFolder } = globalOpts;
      const dropbox = getDropbox(globalOpts);

      return dropbox.filesGetMetadata({ path: pathFolder + '/' + filename });
    },
    /**
     * Upload files on dropbox
     * @param {object} opts 
     * @returns {stream}
     */
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
          dropbox.filesUpload({ path: mergedOptions.pathFolder + '/' + file.filename, contents: Buffer(this.buffer, 'binary') })
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