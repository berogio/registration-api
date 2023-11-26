const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');
const validator = require('email-validator');
const passwordValidator = require('password-validator');

mongoose.connect("mongodb+srv://gberi2012:1OHgbKre249Xc3qf@cluster0.a2bfzeu.mongodb.net/?retryWrites=true&w=majority")
    .then(a => console.log('Connected to MongoDb'))
    .catch((error) => {
        console.log(`${error}error connecting to MongoDb`)
    });


const passwordSchema = new passwordValidator();
passwordSchema
    .is().min(5) // Mindestlänge 5 Zeichen
    .has().uppercase(); // Mindestens ein Großbuchstabe

const UserSchema = mongoose.Schema({
    vorname: {
        type: String,
        required: true
    },
    nachname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: validator.validate,
            message: props => `${props.value} is not a valid email address!`
        }
    },
    passwordHash: {
        type: String,
        required: true,
        validate: {
            validator: value => passwordSchema.validate(value),
        }
    }
});

const User = mongoose.model('User', UserSchema);


router.post('/register', async(req, res) => {
    const saltRounds = 10;

    try {
        const { vorname, nachname, email, password } = req.body;

        if (!validator.validate(email)) {
            return res.status(400).json({ error: 'Invalid email address' });
        }

        if (!passwordSchema.validate(password)) {
            return res.status(400).json({ error: 'Password must be at least 5 characters long and contain at least one uppercase letter.' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const passwordHash = await bcrypt.hash(password, saltRounds);
        const newUser = new User({
            vorname,
            nachname,
            email,
            passwordHash,
        });

        await newUser.save();

        res.status(201).json({ message: 'New User saved', redirectTo: 'login' });
    } catch (error) {

        res.status(500).json({ error: error.message });
    }
});

router.post('/login', async(req, res, next) => {
    try {

        const loginPassword = req.body.loginPassword;
        const loginEmail = req.body.loginEmail;

        const user = await User.findOne({ email: loginEmail });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(loginPassword, user.passwordHash);

        if (passwordMatch) {
            console.log(req.requesTime)
            req.session.user = 'gio'

            // Do something when the password is correct, e.g., generate a token
            res.status(200).json({ message: 'OK', redirectTo: 'panel.html' });

        } else {
            res.status(401).json({ error: 'Incorrect password' });

        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/login', async(req, res, next) => {
    if (req.session.user) {
        console.log('gio')
        res.sendFile('panel.html', { root: 'public' });
    } else {
        res.sendFile('login.html', { root: 'public' });
    }


});



let guard = function() {
    return function middler(req, res, next) {
        if (req.session.user) {
            next();
        } else {
            res.status(401).json('not authorised');
        }
    };
};

router.get('/panel', guard(), async(req, res, next) => {
    res.sendFile('panel.html', { root: 'public' });
});

module.exports = router;