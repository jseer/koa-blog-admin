const { makeValidators } = require('../helper');
const rules = {
    register: {
        username: {
            type: 'string',
            required: true,
            min: 1,
            max: 20,
        },
        password: {
            type: 'string',
            required: true,
            min: 1,
            max: 20,
        }
    },
    login: {
        username: {
            type: 'string',
            required: true,
        },
        password: {
            type: 'string',
            required: true,
        },
    }
}

module.exports = makeValidators(rules);