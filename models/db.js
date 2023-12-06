const mongoose = require('mongoose');
require('dotenv').config();

const mongoPassword = process.env.MONGODB_PASSWORD;
const mongoURI = `mongodb+srv://gberi2012:${mongoPassword}@cluster0.a2bfzeu.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(mongoURI, )
    .then(a => console.log('Connected to MongoDb'))
    .catch((error) => {
        console.log(`${error}error connecting to MongoDb`)
    });

module.exports = mongoose