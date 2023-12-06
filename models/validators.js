const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();
passwordSchema.is().min(5).has().uppercase();

module.exports = passwordSchema;