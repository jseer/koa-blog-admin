const { makeValidators } = require('../helper');
const rules = {
    create: {
        title: {
            type: 'string',
            min: 1,
            max: 20,
            required: true,
        },
        description: {
            type: 'string',
            required: true,
            min: 20,
            max: 100,
        }
    },
    query: {
        pageSize: {
            type: 'number',
            min: 1,
            required: true,
        },
        pageNum: {
            type: 'number',
            min: 1,
            required: true,
        },
    },
    get: {
        id: {
            required: true,
            validator(rule, value, callback) {
                if(!value) {
                    callback('id is required');
                    return;
                }
                if(/^\d+$/.test(value)) {
                    callback();
                } else {
                    callback(new Error('id非法'));
                }
            }
        }
    },
    update: {
        id: {
            required: true,
            validator(rule, value, callback) {
                if(!value) {
                    callback('id is required');
                    return;
                }
                if(/^\d+$/.test(value)) {
                    callback();
                } else {
                    callback(new Error('id非法'));
                }
            }
        },
        title: {
            type: 'string',
            min: 1,
            max: 20,
            required: true,
        },
        description: {
            type: 'string',
            required: true,
            min: 20,
            max: 100,
        }
    },
    publish: {
        ids: {
            required: true,
            type: 'array',
            defaultField: { type: 'number', required: true },
        }
    },
    delete: {
        ids: {
            required: true,
            type: 'array',
            defaultField: { type: 'number', required: true },
        }
    }
}

module.exports = makeValidators(rules);