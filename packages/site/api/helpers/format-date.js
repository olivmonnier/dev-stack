const moment = require('moment');

module.exports = {
  friendlyName: 'Date',
  description: 'Format date',

  inputs: {
    date: {
      type: 'string',
      required: true
    },
    lang: {
      type: 'string',
      required: true
    },
    format: {
      type: 'string',
      defaultsTo: 'L'
    }
  },

  exits: {},

  fn: function(inputs, exits) {
    const date = inputs.date;
    const lang = inputs.lang;
    const format = inputs.format;

    moment.locale(lang);

    const dateFormatted = moment(date).format(format);

    return exits.success(dateFormatted);
  }
}