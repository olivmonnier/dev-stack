module.exports = {
  get: async function(req, res) {
    const lang = req.param('lang');

    req.setLocale(lang);
    res.cookie('lang', lang);

    return res.redirect('/');
  }
}