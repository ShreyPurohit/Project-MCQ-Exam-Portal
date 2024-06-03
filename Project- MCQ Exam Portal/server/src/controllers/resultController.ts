import { NextFunction, Request, Response } from "express";
import asyncHandler from 'express-async-handler'

import { AppError } from "../middlewares/errorHandler";

import ExamModel from "../models/examModel";

// @desc Show Exams
// @route GET /api/result/myExams
// @access private
const getExams = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const exams = await ExamModel.find().select('-__v -updatedAt -prof_id -questions -createdAt').where('scheduledAt').ne('')
    if (!exams) throw new AppError("No Exams Scheduled Yet", 200)
    res.status(200).json({
        message: "success",
        data: exams
    })
})

// @desc Show Exam
// @route GET /api/result/myExams/:exam_id
// @access private
const getParticularExam = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { exam_id } = req.params
    const exam = await ExamModel.findById({ _id: exam_id }).select('-__v -updatedAt -prof_id -createdAt')
    if (!exam) throw new AppError("Exam Not Found", 404)
    res.status(200).json({
        message: "success",
        data: exam
    })
})

// @desc Create Exams
// @route POST /api/result/createExam
// @access private
const takeExam = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

})


export { getExams, takeExam, getParticularExam }