const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Emailaddresses = require('machinepack-emailaddresses');

module.exports = {
  // patch /api/users/login
	login: async function(req, res) {
		const user = await User.findOne({
			username: req.param('username')
		});

		if (!user) return res.notFound();

		await bcrypt.compare(req.param('password'), user.password);

		const token = jwt.sign({ user: user.id }, sails.config.jwtSecret, { expiresIn: sails.config.jwtExpires });

		res.cookie('sailsjwt', token, {
			signed: true,
			maxAge: sails.config.jwtExpires
		});

		return res.ok(token)
	},

	// patch /api/users/logout
	logout: function(req, res) {
		req.user = null;

		return res.ok()
	},

	// post /api/users/register
	register: function(req, res) {
		if (_.isUndefined(req.param('username'))) {
			return res.badRequest('An email address is required.')
		}

		if (_.isUndefined(req.param('password'))) {
			return res.badRequest('A password is required.')
		}

		if (req.param('password').length < 8) {
			return res.badRequest('Password must be at least 8 characters.')
		}

		Emailaddresses.validate({
			string: req.param('username'),
		}).exec({
			error: function(err) {
				return res.serverError(err)
			},
			invalid: function() {
				return res.badRequest('Doesn\'t look like an email address.')
			},
			success: async function() {
				const user = await sails.helpers.createUser({
					username: req.param('username'),
					password: req.param('password'),
				})

				const token = jwt.sign({ user: user.id }, sails.config.jwtSecret, { expiresIn: sails.config.jwtExpires })

				if (req.wantsJSON) {
					return res.ok(token)
				}

				return res.redirect('/')
			}
		})
	},
}