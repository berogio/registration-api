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



module.exports = router;