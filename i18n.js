const i18n = require('i18n');

i18n.configure({
    locales: ['en', 'de'],
    defaultLocale: 'en',
    directory: __dirname + '/locales',
    objectNotation: true,
});

module.exports = i18n;