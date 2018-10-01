const crypto = require('crypto');

module.exports = {
  friendlyName: 'Generate random string',
  description: 'Generates a cryptographically random string, for lower chances of collisions.',

  sync: true,
  inputs: {
    size: {
      type: 'number',
      description: 'The number of characters the string should be. Ish.',
      required: true
    }
  },
  fn: function(inputs, exits) {
    const text = crypto.randomBytes(inputs.size * 0.5).toString('hex');

    return exits.success(text);
  }
}