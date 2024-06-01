import { NextFunction, Request, Response } from "express";
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import config from 'config'

import { AppError } from "../middlewares/errorHandler";
import { userRegisterValidation } from "../validations/userValidations";
import passport from '../stratergies/local-stratergy'

import UserModel from "../models/userModel";

const JWT_SECRET: string = config.get('token_config.secret_key')

// @desc Register User
// @route POST /api/user/register
// @access public
const registerUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, role } = req.body

    const { error } = userRegisterValidation.validate(req.body)
    if (error) throw new AppError(error.message, 400)
    const userExists = await UserModel.findOne({ email })
    if (userExists) throw new AppError("User Already Exists", 400)

    const user = await UserModel.create({
        name, email, password, role
    })
    res.status(201).json({
        status: "Success",
        data: {
            _id: user.id,
            email: user.email
        }
    })
})

// @desc Login User
// @route POST /api/user/login
// @access public
const loginUser = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', { session: false }, (err: any, user: any, info: string) => {
        if (!user || err) { return res.status(400).json({ status: 'fail', info }) }
        const accessToken = jwt.sign({
            user: {
                id: user.id,
                role: user.role,
            }
        }, JWT_SECRET, { expiresIn: '1hr' });
        res.status(200).cookie('jwt', accessToken, { maxAge: 60000 * 60, sameSite: "none", secure: true }).json({
            status: "Success",
            message: "Logged In Successfully",
            data: { accessToken }
        })
    })(req, res, next);
}

// @desc Logout User Info
// @route Post /api/user/logout
// @access private
const logoutUser = (async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).clearCookie("jwt", { path: "/", sameSite: 'none', secure: true }).json({
        message: "Bye Bye"
    })
})

export { registerUser, loginUser, logoutUser }