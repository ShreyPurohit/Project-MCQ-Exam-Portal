import express, { Request, Response, NextFunction } from "express";
import cookieparser from 'cookie-parser'
import passport from 'passport'
import cors from 'cors'

import connectDB from "./database/dbConnection";
import { AppError, errorGiver } from "./middlewares/errorHandler";

import UserRoutes from "./routes/userRoutes";
import ExamRoutes from "./routes/examRoutes";

const app = express()
app.disable('x-powered-by')
app.use(express.json())
app.use(cookieparser())

const corsOptions = {
    origin: function (origin: any, callback: any) {
        if (!origin) return callback(null, true);
        const whitelist = ['http://localhost:5174'];
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, 
    optionsSuccessStatus: 204 
};

app.use(cors(corsOptions))


app.get("/", (req: any, res: Response) => {
    res.status(200).send("Welcome To MCQ Exam Portal")
})

app.use(passport.initialize())
connectDB()

app.use("/api/users", UserRoutes) 
app.use(passport.authenticate('jwt', { session: false }))
app.use('/api/exams', ExamRoutes)

app.all("*", (req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
})
app.use(errorGiver)

export default app