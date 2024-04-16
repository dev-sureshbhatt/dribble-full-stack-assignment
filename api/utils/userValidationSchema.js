import Joi from "joi";

export const userValidationSchema = Joi.object({
    name: Joi.string()
    .required(),
    
    username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .messages(
        {
            'string.min': "username length must be at least 3 characters long",
            'string.max': "username length must be less than or equal to 30 characters long"
        }
    ),

    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({
        'string.email': "Email must be a valid email"
    }),

    password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')) // min 6 // not  using the regex in databse because we need to store hashed values there
    .required()
    .messages({
        'string.pattern.base': "Password must contain alphabets and numbers only. Minimum characters 6 and maximum 30"  // custom message when regex doesn't match. The default message was not appropriate to show to users
    })
})