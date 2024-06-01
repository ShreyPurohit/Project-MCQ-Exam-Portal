import express, { Request, Response, NextFunction } from "express";
import cookieparser from 'cookie-parser'
import passport from 'passport'
import cors from 'cors'

import connectDB from "./database/dbConnection";
import { AppError, errorGiver } from "./middlewares/errorHandler";

import UserRoutes from "./routes/userRoutes";
import ExamRoutes from "./routes/examRoutes";
import restrictTo from "./middlewares/roleHandler";
import authenticateJwt from "./middlewares/authenticatejwt";

const app = express()
app.disable('x-powered-by')
app.use(express.json())

app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

app.use(cookieparser())
app.use(express.urlencoded({ extended: false }))

app.get("/", (req: any, res: Response) => {
    res.status(200).send("Welcome To MCQ Exam Portal")
})

app.use(passport.initialize())
connectDB()

app.use("/api/users", UserRoutes)

app.use('/api/exams', authenticateJwt, restrictTo('faculty'), ExamRoutes)

app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})
app.use(errorGiver)

export default app