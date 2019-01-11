const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Emailaddresses = require('machinepack-emailaddresses');

module.exports = {
  // post /login
	login: async function(req, res) {
		const user = await User.findOne({
			username: req.param('username')
		});

		if (!user) return res.notFound();

		const correctPassword = await bcrypt.compare(req.param('password'), user.password);
	
		if (process.env.NODE_ENV === 'production') {
			if (!correctPassword) return res.badRequest('Wrong password');
		}

		const token = jwt.sign({ user: user.id }, sails.config.jwtSecret, { expiresIn: sails.config.jwtExpires });

		res.cookie('sailsjwt', token, {
			signed: true,
			maxAge: sails.config.jwtExpires
		});

		return res.ok(token)
	},

	// post /logout
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
				const user = await sails.helpers.createUser.with({
					username: req.param('username'),
					password: req.param('password')
				})

				const token = jwt.sign({ user: user.id }, sails.config.jwtSecret, { expiresIn: sails.config.jwtExpires })

				if (req.wantsJSON) {
					return res.ok(token)
				}

				return res.redirect('/')
			}
		})
	},

	get: async function(req, res) {
		const id = req.param('id');
		const user = await User.findOne({ id });

		return res.json(user);
	},
	getAll: async function(req, res) {
		const { resources, total } = await sails.helpers.getAll(req, User);

    return res.set('X-Total-Count', total).json(resources);
	},
	create: async function (req, res) {
		const params = req.allParams();

		params.password = await bcrypt.hash(req.param('password'), 10);

		const user = await User.create(params)
			.fetch();

		res.ok(user);
	},
	update: async function(req, res) {
		const id = req.param('id');
		const params = req.allParams();

		params.password = await bcrypt.hash(req.param('password'), 10);

		const userUpdated = await User.update({ id }, params).fetch();

		res.ok(userUpdated);
	},
	delete: async function(req, res) {
		const id = req.param('id');
		const userDestroyed = await User.destroy({ id }).fetch();

		res.ok(userDestroyed);
	}
}