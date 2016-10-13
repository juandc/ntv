const IntlRelativeFormat = require('intl-relativeformat');
const IntlMessageFormat = require('intl-messageformat');

const MESSAGES = {};
const es = require('./lang/es');
const en = require('./lang/en-US');

MESSAGES.es = es;
MESSAGES['en-US'] = en;

let locale = localStorage.locale || 'es';

module.exports = {
  message: function (text, opts) {
    opts = opts || {};
    const msg = new IntlMessageFormat(MESSAGES[locale][text], 'es', null);
    return msg.format(opts);
  }
}
