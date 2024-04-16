import Joi from "joi";

export const userValidationSchema = Joi.object({
    name: Joi.string(),
    
    username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')) // min 6 // not  using the regex in databse because we need to store hashed values there
})