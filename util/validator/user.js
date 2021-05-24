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
            min: 6,
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
    },
    query: {
        pageNum: {
            type: 'number',
            required: true,
            min: 1,
        },
        pageSize: {
            type: 'number',
            required: true,
            min: 1,
        }
    },
    update: {
        id: {
            type: 'number',
            required: true,
        },
        isAdmin: {
            type: 'boolean',
        }
    },
    delete: {
        ids: {
            type: 'array',
            required: true,
            defaultField: { type: 'number', required: true },
        }
    }
}

module.exports = makeValidators(rules);