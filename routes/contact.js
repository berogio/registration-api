const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
router.get('/contact', function(req, res, next) {

    res.sendFile('kontakt.html', { root: 'public' });
});

router.post('/contact', function(req, res, next) {
    // Die Formulardaten befinden sich in req.body
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    console.log('Name:', name);
    console.log('E-Mail:', email);
    console.log('Nachricht:', message);

    // Konfiguriere den Nodemailer-Transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'gberi2012@agruni.edu.ge',
            pass: ''
        }
    });

    // Konfiguriere die E-Mail-Optionen
    const mailOptions = {
        from: 'gberi2012@agruni.edu.ge',
        to: 'gberi2012@agruni.edu.ge',
        subject: 'Neue Kontaktanfrage',
        text: `Name: ${name}\nE-Mail: ${email}\nNachricht: ${message}`
    };

    // Sende die E-Mail
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            res.status(500).send('Fehler beim Senden der E-Mail');
        } else {
            console.log('E-Mail gesendet: ' + info.response);
            res.status(200).send('E-Mail erfolgreich gesendet');
        }
    });
});

module.exports = router;