const jwt = require('jsonwebtoken');

module.exports = {
  friendlyName: 'Verify JWT',
  description: 'Verify a JWT token.',

  inputs: {
    req: {
      type: 'ref',
      friendlyName: 'Request',
      description: 'A reference to the request object (req).',
      required: true
    }
  },
  exits: {
    invalid: {
      description: 'Invalid token or no authentication present.'
    }
  },
  fn: function(inputs, exits) {
    const req = inputs.req;

    if (req.header && req.header('authorization')) {
      const token = req.header('authorization').split('Bearer ')[1];

      if (!token) return exits.invalid();

      return jwt.verify(token, sails.config.jwtSecret, async function(err, payload) {
        if (err || !payload.user) return exits.invalid();
        
        const user = await User.findOne(payload.user);
        
        if (!user) return exits.invalid();
        
        req.user = user;
        
				return exits.success(user);
			})
    }

    return exits.invalid();
  }
}