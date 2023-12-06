const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.get('/contact', function(req, res, next) {
    res.sendFile('contact.html', { root: 'public' });
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
            pass: ''
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
            res.status(500).send('Error sending the E-Mail');
        } else {
            console.log('E-Mail sent: ' + info.response);
            res.status(200).send('E-Mail sent successfully');
        }
    });
});

module.exports = router;