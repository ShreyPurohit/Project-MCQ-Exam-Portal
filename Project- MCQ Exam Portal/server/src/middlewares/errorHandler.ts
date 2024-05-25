import { Request, Response, NextFunction } from "express";

class AppError extends Error {
    statusCode: number;
    status: string;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : "error"
        Error.captureStackTrace(this, this.constructor)
    }
}

const errorGiver = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    console.log(err.stack);
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
}

export { AppError, errorGiver }