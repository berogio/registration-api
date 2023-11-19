const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


mongoose.connect("mongodb+srv://gberi2012:1OHgbKre249Xc3qf@cluster0.a2bfzeu.mongodb.net/?retryWrites=true&w=majority")
    .then(a => console.log('Connected to MongoDb'))
    .catch((error) => {
        console.log(`${error}error connecting to MongoDb`)
    });


const UserSchema = mongoose.Schema({
    vorname: String,
    nachname: String,
    email: String,
    password: String,

})


const User = mongoose.model('User', UserSchema);

router.post('/register', async(req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.json('New User saved');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;