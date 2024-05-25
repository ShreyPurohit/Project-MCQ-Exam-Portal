import express, { Request, Response, NextFunction } from "express";
import session from 'express-session'
import config from 'config'
import cookieparser from 'cookie-parser'
import connectDB from "./database/dbConnection";
import { AppError, errorGiver } from "./middlewares/errorHandler";

import UserRoutes from "./routes/userRoutes";

const app = express()
app.disable('x-powered-by')

connectDB()

app.use(express.json())
app.use(cookieparser())

app.use(session({
    secret: config.get("token_config.secret_key"),
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60
    }
}))

app.get("/", (req: any, res: Response) => {
    res.status(200).send("Welcome To MCQ Exam Portal")
    console.log(req.session)
    console.log(req.session.id)
})

app.use("/api/users", UserRoutes)

app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})
app.use(errorGiver)

export default app