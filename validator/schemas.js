const joi = require('joi');

const schemas = {
    commonIdQuery: joi.object({
        _id: joi.number().required(),
    }),
    login: joi.object({
        email: joi.string().email().required(),
        password: joi.string().required(),
    }),
    registerUser: joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required(),
    }),
    createTodo: joi.object({
        title: joi.string().min(1).required().trim(),
        description: joi.string().optional().allow('')
    }),
    updateTodo: joi.object({
        title: joi.string().min(1).optional().trim(),
        description: joi.string().optional().allow(''),
        completed: joi.boolean().valid(...[true, false]).optional(),
    }),
    paginationQuery: joi.object({
        pageNumber: joi.number().optional(),
        limit: joi.number().optional()
    })
}

module.exports = schemas;