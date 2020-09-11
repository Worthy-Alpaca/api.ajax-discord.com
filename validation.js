//validation
const Joi = require('@hapi/joi');

//register validation
const registerValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string()
            .min(6)
            .required(),
        password: Joi.string()
            .min(6)
            .required(),
        guild: Joi.object().keys({
            name: Joi.string().required(),
            id: Joi.string().required()
        })
    })

    return schema.validate(data);
}

const loginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string()
            .min(6)
            .required(),
        password: Joi.string()
            .min(6)
            .required()
    })

    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;