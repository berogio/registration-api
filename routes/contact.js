const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const i18n = require('../i18n.js');
require('dotenv').config();

router.get('/contact', async(req, res, next) => {

    const currentLocale = req.query.lang || i18n.getLocale();


    i18n.setLocale(req, currentLocale);

    res.render('contact', {
        title: res.__('contactForm.title'),
        currentLocale: currentLocale,
    });
});

router.post('/contact', function(req, res, next) {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    console.log('Name:', name);
    console.log('E-Mail:', email);
    console.log('Nachricht:', message);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'gberi2012@agruni.edu.ge',
            pass: process.env.EMAIL_CLIENT_PASSWORD
        }
    });

    const mailOptions = {
        from: 'gberi2012@agruni.edu.ge',
        to: 'gberi2012@agruni.edu.ge',
        subject: 'New Contact Request',
        text: `Name: ${name}\nE-Mail: ${email}\nMessage ${message}`
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            res.status(500).json({ error: i18n.__('messages.emailSendingError') });
        } else {
            console.log('E-Mail sent: ' + info.response);
            res.status(200).json({ message: i18n.__('success.emailSentSuccessfully') });
        }
    });

});

module.exports = router;