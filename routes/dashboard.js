const express = require('express');
const router = express.Router();
// const { guard } = require('../middleware/AllMiddleware');
const User = require('../models/user.js');
const i18n = require('../i18n.js');
let guard = function() {
    return function middler(req, res, next) {
        if (req.session.user) {
            console.log('test111')
            next();
        } else {
            res.status(401).redirect('/login');
        }
    };
};
router.get('/dashboard', guard(), async(req, res, next) => {
    try {
        const userId = req.session.user;
        const user = await User.findById(userId);
        const currentLocale = req.query.lang || i18n.getLocale();
        i18n.setLocale(req, currentLocale);
        res.render('dashboard', {
            user,
            title: res.__('profileOverview.title'),
            currentLocale: currentLocale,
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).redirect('/login');
    }
});


module.exports = router;