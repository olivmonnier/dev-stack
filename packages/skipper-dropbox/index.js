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
    rm() {

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

        file.pipe(stream)
      }

      return receiver__;
    }
  }

  return adapter;
}

function getDropbox(opts) {
  return new Dropbox({ fetch, accessToken: opts.accessToken })
}