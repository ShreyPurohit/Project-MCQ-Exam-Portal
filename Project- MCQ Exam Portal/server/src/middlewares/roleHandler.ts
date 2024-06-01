import { NextFunction, Response, Request } from "express";
import config from 'config'
import jwt from 'jsonwebtoken'

import { AppError } from "./errorHandler";
import { IUser } from "../models/userModel";

interface IJwtPayload {
  user: IUser
}

const restrictTo = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const cookie = req.cookies.jwt
    if (!cookie) throw new AppError("Please Login First", 401)
    try {
      const userObj = jwt.verify(cookie, config.get('token_config.secret_key')) as IJwtPayload
      if (String(userObj.user.role) === role) {
        next()
      } else {
        throw new AppError("You are Unauthorised for this route", 401)
      }
    } catch {
      throw new AppError("Invalid Token Or Unauthorised for this route", 401)
    }
  }
}
export default restrictTo 