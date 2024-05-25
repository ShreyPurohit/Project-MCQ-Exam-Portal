import { NextFunction, Request, Response } from "express";
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'

import { AppError } from "../middlewares/errorHandler";
import { userRegisterValidation, userLoginValidation } from "../validations/userValidations";

import UserModel from "../models/userModel";

// @desc Register User
// @route POST /api/user/register
// @access public
const registerUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, role } = req.body

    const { error } = userRegisterValidation.validate(req.body)
    if (error) throw new AppError(error.message, 400)
    const userExists = await UserModel.findOne({ email })
    if (userExists) throw new AppError("User Already Exists", 400)

    const hashed_password = await bcrypt.hash(password, 10)
    const user = await UserModel.create({
        name,
        email,
        password: hashed_password,
        role
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
const loginUser = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { email, password } = req.body
    const { error } = userLoginValidation.validate(req.body)
    if (error) throw new AppError("Invalid Credentials", 400)
    const user = await UserModel.findOne({ email }).select('+password')
    console.log(user);
    if (user && (await bcrypt.compare(password, String(user.password)))) {
        req.session.visited = true
        res.status(200).cookie("Login_Cookie", "loggeddinn").json({
            message: "Logged In Successfully"
        })
        console.log(req.session);
        console.log(req.session.id);
    } else {
        throw new AppError("Invalid Credentials Or Account Not Created..", 400)
    }
})

// @desc Logout User Info
// @route Post /api/user/logout
// @access private
const logoutUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.cookies.Login_Cookie) throw new AppError("Please Login First", 403)
    res.status(200).clearCookie("Login_Cookie", { path: "/" }).json({
        message: "Bye Bye"
    })
})

export { registerUser, loginUser, logoutUser }