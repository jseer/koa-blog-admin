let AsyncValidator = require('async-validator');
AsyncValidator = AsyncValidator.__esModule ? AsyncValidator.default : AsyncValidator;

exports.makeValidators = (rules) => {
    const validators = {};
    Object.keys(rules).forEach((key)=> {
        validators[key] = new AsyncValidator(rules[key]);
    })
    return validators;
}