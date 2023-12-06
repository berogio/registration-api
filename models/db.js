const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://gberi2012:1OHgbKre249Xc3qf@cluster0.a2bfzeu.mongodb.net/?retryWrites=true&w=majority")
    .then(a => console.log('Connected to MongoDb'))
    .catch((error) => {
        console.log(`${error}error connecting to MongoDb`)
    });

module.exports = mongoose