const mongoose = require('../models/db.js');
const validator = require('email-validator');
const passwordSchema = require('./validators.js')
const i18n = require('../i18n.js');
const UserSchema = mongoose.Schema({
    vorname: {
        type: String,
        required: true,
        validate: {
            validator: value => /^[a-zA-Z]+$/.test(value),
            message: i18n.__('messages.vornameValidation'),
        },
        minlength: [2, i18n.__('messages.vornameValidation')],
        maxlength: [50, i18n.__('messages.vornameValidation')],
    },
    nachname: {
        type: String,
        required: true,
        validate: {
            validator: value => /^[a-zA-Z]+$/.test(value),
            message: i18n.__('messages.nachnameValidation'),
        },
        minlength: [2, i18n.__('messages.nachnameValidation')],
        maxlength: [50, i18n.__('messages.nachnameValidation')],
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

module.exports = User;