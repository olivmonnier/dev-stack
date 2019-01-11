/**
 * FileController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  cloudinaryUpload: async function  (req, res) {
    if (req.file('imagesUpload[]')) {
      const images = await sails.helpers.uploadCloudinary(
        req, 'imagesUpload[]'
      );

      return res.json(images);
    } else {
      return res.ok()
    }
  },
  dropboxUpload: async function (req, res) {
    if (req.file('documentsUpload[]')) {
      const documents = await sails.helpers.uploadDropbox(
        req, 'documentsUpload[]'
      );

      return res.json(documents);
    } else {
      return res.ok();
    }
  }
};

