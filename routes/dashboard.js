const express = require('express');
const router = express.Router();
const { guard } = require('../middleware/AllMiddleware');

router.get('/dashboard', guard(), async(req, res, next) => {
    res.sendFile('dashboard.html', { root: 'public' });
});

module.exports = router;