const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const validator = require('email-validator');
const passwordSchema = require('../models/validators.js')
const { guard } = require('../middleware/AllMiddleware');
const User = require('../models/user.js');
const i18n = require('../i18n.js');

router.post('/register', async(req, res) => {
    const saltRounds = 10;

    try {
        const { vorname, nachname, email, password } = req.body;
        if (!validator.validate(email)) {
            return res.status(400).json({ error: i18n.__('messages.invalidEmail') });
        }
        if (!passwordSchema.validate(password)) {
            return res.status(400).json({ error: i18n.__('messages.passwordRequirements') });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: i18n.__('messages.emailExists') });
        }
        const passwordHash = await bcrypt.hash(password, saltRounds);
        const newUser = new User({
            vorname,
            nachname,
            email,
            passwordHash,
        });
        try {
            await newUser.save();
            res.status(201).json({ message: i18n.__('success.newUserSaved'), redirectTo: '/login' });
        } catch (mongooseError) {
            if (mongooseError.errors && mongooseError.errors.vorname) {
                return res.status(400).json({ error: mongooseError.errors.vorname.message });
            } else if (mongooseError.errors && mongooseError.errors.nachname) {
                return res.status(400).json({ error: mongooseError.errors.nachname.message });
            } else if (mongooseError.errors && mongooseError.errors.email) {
                return res.status(400).json({ error: mongooseError.errors.email.message });
            } else {
                return res.status(500).json({ error: i18n.__('messages.internalServerError') });
            }
        }
    } catch (error) {
        res.status(500).json({ error: i18n.__('messages.internalServerError') });
    }
});

router.post('/login', async(req, res, next) => {
    try {
        const { loginPassword, loginEmail } = req.body;
        const user = await User.findOne({ email: loginEmail });
        if (!user) {
            console.log('test3')
            return res.status(404).json({ error: i18n.__('messages.userNotFound') });

        }
        const passwordMatch = await bcrypt.compare(loginPassword, user.passwordHash);
        if (passwordMatch) {
            req.session.user = user._id
            console.log('test1')
            res.status(200).json({ message: i18n.__('success.loginSuccess'), redirectTo: 'dashboard' });
            console.log('test2')
        } else {
            res.status(401).json({ error: i18n.__('messages.incorrectPassword') });
        }
    } catch (error) {
        res.status(500).json({ error: i18n.__('messages.internalServerError') });
        console.log('test4')
    }
});

router.get('/login', async(req, res, next) => {
    if (req.session.user) {
        res.redirect('/dashboard');
    } else {
        const currentLocale = req.query.lang || i18n.getLocale();
        i18n.setLocale(req, currentLocale);
        res.render('login', {
            currentLocale: currentLocale,
            title: res.__('authorization.title'),
            registrationHeading: res.__('authorization.registration.heading'),
            currentLocale: currentLocale,
        });
    }
});

router.post('/edit', guard(), async(req, res, next) => {
    try {
        const userId = req.session.user;
        if (!userId) {
            return res.status(401).json({ error: i18n.__('messages.notAuthenticated') });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: i18n.__('messages.userNotFound') });
        }
        const { currentPassword, newPassword } = req.body;
        if (!passwordSchema.validate(newPassword)) {
            return res.status(400).json({ error: i18n.__('messages.passwordRequirements') });
        }
        const passwordMatch = await bcrypt.compare(currentPassword, user.passwordHash);
        if (!passwordMatch) {
            return res.status(401).json({ error: i18n.__('messages.incorrectCurrentPassword') });
        }
        const newHashedPassword = await bcrypt.hash(newPassword, 10);
        user.passwordHash = newHashedPassword;
        await user.save();
        res.status(200).json({ message: i18n.__('success.passwordChanged') })
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ error: i18n.__('messages.internalServerError') });
    }
});

router.post('/signout', async(req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ error: i18n.__('messages.internalServerError') });
        }
        res.status(200).json({ message: 'Logout successful' });
    });
});

router.get('/edit', guard(), async(req, res, next) => {
    const currentLocale = req.query.lang || i18n.getLocale();
    i18n.setLocale(req, currentLocale);

    res.render('edit', {
        currentLocale: currentLocale,
        title: res.__('authorization.title'),
        registrationHeading: res.__('authorization.registration.heading'),
        currentLocale: currentLocale,
    });
});

module.exports = router;