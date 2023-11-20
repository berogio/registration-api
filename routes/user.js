const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');

mongoose.connect("mongodb+srv://gberi2012:1OHgbKre249Xc3qf@cluster0.a2bfzeu.mongodb.net/?retryWrites=true&w=majority")
    .then(a => console.log('Connected to MongoDb'))
    .catch((error) => {
        console.log(`${error}error connecting to MongoDb`)
    });


const UserSchema = mongoose.Schema({
    vorname: String,
    nachname: String,
    email: String,
    passwordHash: String,

})

const User = mongoose.model('User', UserSchema);
const plainPassword = 'mySecurePassword';
router.post('/register', async(req, res) => {
    const saltRounds = 10

    try {
        const { vorname, nachname, email, password } = req.body
        const passwordHash = await bcrypt.hash(password, saltRounds)
        const newUser = new User({
            vorname,
            nachname,
            email,
            passwordHash,
        });
        await newUser.save();
        res.status(201).json('New User saved');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/login', async(req, res, next) => {
    res.sendFile('login.html', { root: 'public' });
});
router.post('/login', async(req, res, next) => {
    try {
        const loginPassword = req.body.loginPassword;
        const loginEmail = req.body.loginEmail;

        const user = await User.findOne({ email: loginEmail });

        if (!user) {
            console.log('User not found');
            return res.status(404).json({ error: 'User not found' });
        }

        // Now that you have the user, you can compare the password
        const passwordMatch = await bcrypt.compare(loginPassword, user.passwordHash);

        if (passwordMatch) {
            console.log('Password is correct');
            // Do something when the password is correct, e.g., generate a token
            res.status(200).json({ message: 'OK' })
        } else {
            res.status(401).json({ error: 'Incorrect password' });

        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;