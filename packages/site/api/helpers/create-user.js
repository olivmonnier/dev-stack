const bcrypt = require('bcryptjs');

module.exports = {
  friendlyName: 'Create user',
  description: 'Create a new user.',

  inputs: {
    username: {
      type: 'string'
    },
    password: {
      type: 'string'
    }
  },

  exits: {
    invalid: {
      responseType: 'badRequest',
			description: 'The provided email address and/or password are invalid.',
    },
    emailAlreadyInUse: {
			statusCode: 409,
			description: 'The provided email address is already in use.',
		},
  },

  fn: async function(inputs, exists) {
    let attr = {
      // id: sails.helpers.randomCryptoString({ size: 32 }).execSync(),
      username: inputs.username.toLowerCase()
    }

    if (inputs.password) {
      attr.password = await bcrypt.hash(inputs.password, 10);

      const user = await User.create(attr)
        .intercept('E_UNIQUE', () => 'emailAlreadyInUse')
        .intercept({ name: 'UsageError' }, () => 'invalid')
        .fetch();

      return exists.success(user);
    } else {
      return exists.invalid('Missing password.')
    }
  }
}