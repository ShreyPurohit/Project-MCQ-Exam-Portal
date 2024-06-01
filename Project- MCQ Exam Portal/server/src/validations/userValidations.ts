import Joi from "joi";
import { EUser } from "../models/userModel";

const userRegisterValidation = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid(EUser.admin, EUser.faculty, EUser.student).required()
})

export { userRegisterValidation }