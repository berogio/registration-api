var express = require('express');
var router = express.Router();
const i18n = require('../i18n.js');

router.get('/', function(req, res, next) {
    const currentLocale = req.query.lang || i18n.getLocale();
    i18n.setLocale(req, currentLocale);
    res.render('index', {
        title: res.__('authorization.title'),
        registrationHeading: res.__('authorization.registration.heading'),
        currentLocale: currentLocale,
    });
});

module.exports = router;