const express = require('express');
const router = express.Router();
const { guard } = require('../middleware/AllMiddleware');
const User = require('../models/user.js');

router.get('/dashboard', guard(), async(req, res, next) => {
    try {
        const userId = req.session.user;
        const user = await User.findById(userId);
        if (user) {

            res.render('dashboard', { user });
        } else {
            res.status(401).redirect('/login');
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).redirect('/login');
    }
});

module.exports = router;