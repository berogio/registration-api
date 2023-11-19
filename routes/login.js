const express = require('express');
const router = express.Router();


router.get('/login', function(req, res, next) {
    res.sendFile('login.html', { root: 'public' });
});


router.post('/login', async(req, res, next) => {

    const { loignPassword, loginEmail } = req.body



});

module.exports = router;