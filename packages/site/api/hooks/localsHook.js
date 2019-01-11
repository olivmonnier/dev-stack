module.exports = function(sails) {

  return {

    routes: {

      // Define routes to be matched _before_ explicit routes 
      // from config/routes.js and blueprints.
      before: {

        // Define a route handler to match everything.
        '/*': {
          target: async function(req, res, next) {
            req.i18n.setLocaleFromCookie();

            const lang = req.getLocale();

            res.locals['lang'] = lang; // works like a charm...

            next();
          },
          skipAssets: true
        }

      }
    }

  };

};