const Joi = require('@hapi/joi');

const registerValidation = (data) => {
    const registerSchema = Joi.object({
        username: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        confirm_password: Joi.any().valid(Joi.ref('password')).required()
    });
    return registerSchema.validate(data);
}

const loginValidation = (data) => {
    const loginSchema = Joi.object({
        username: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    });
    return loginSchema.validate(data);
}

const postValidation = (data) => {
    const postSchema = Joi.object({
        title: Joi.string().min(10).max(80).required(),
        content: Joi.string().min(50).required(),
        author_id: Joi.string().length(24).hex(),
        tags: Joi.array().max(6).required(),
        categories: Joi.array().max(3)
    });
    return postSchema.validate(data);
}

const userValidation = (data) => {
    const userSchema = Joi.object({
        username: Joi.string().min(6).max(20).required(),
        email: Joi.string().email().min(6).max(30).required(),
        password: Joi.string().min(6).required()
    });
    return userSchema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.postValidation = postValidation;
module.exports.userValidation = userValidation;