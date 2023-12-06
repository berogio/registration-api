const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const i18n = require('../i18n.js');

router.post('/forgot-password', async(req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: i18n.__('messages.userNotFound') });
        }


        //comming son

        const resetToken = generateResetToken();
        sendResetTokenByEmail(user.email, resetToken);


        return res.status(200).json({ message: i18n.__('success.resetTokenSent') });
    } catch (error) {
        console.error('Error sending reset token:', error);
        return res.status(500).json({ error: i18n.__('messages.internalServerError') });
    }
});
module.exports = router;