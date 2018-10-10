/**
 * PostController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  getAll: async function(req, res) {
    const params = req.allParams();
    const paramsCount = req.allParams();

    delete paramsCount.skip;
    delete paramsCount.sort;
    delete paramsCount.limit;

    const posts = await Post.find(params);
    const total = await Post.count(paramsCount);

    return res.set('X-Total-Count', total).json(posts)
  }
};

