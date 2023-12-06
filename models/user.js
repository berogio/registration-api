// const mongoose = require('./db');
// const passwordValidator = require('password-validator');
// const validator = require('email-validator');

// const passwordSchema = new passwordValidator();
// passwordSchema
//     .is().min(5)
//     .has().uppercase();

// const userSchema = mongoose.Schema({
//     vorname: {
//         type: String,
//         required: true
//     },
//     nachname: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         validate: {
//             validator: validator.validate,
//             message: props => `${props.value} is not a valid email address!`
//         }
//     },
//     passwordHash: {
//         type: String,
//         required: true,
//         validate: {
//             validator: value => passwordSchema.validate(value),
//         }
//     }
// });

// const User = mongoose.model('User', userSchema);

//