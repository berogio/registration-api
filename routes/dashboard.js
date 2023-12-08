const express = require('express');
const router = express.Router();
const { guard } = require('../middleware/AllMiddleware');

router.get('/dashboard', guard(), async(req, res, next) => {
    res.render('dashboard');
});

module.exports = router;