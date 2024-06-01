import { NextFunction, Request, Response } from "express";
import asyncHandler from 'express-async-handler'

import { AppError } from "../middlewares/errorHandler";
import { createExamValidation } from "../validations/examValidations";

import ExamModel from "../models/examModel";

// @desc Show Exams
// @route GET /api/exams/myExams
// @access private
const showExams = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const exams = await ExamModel.find({ prof_id: req.user._id }).select('-__v -updatedAt -prof_id')
    res.status(200).json({
        message: "success",
        data: exams
    })
})

// @desc Create Exams
// @route POST /api/exams/createExam
// @access private
const createExams = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { subject_name, topic_name, questions, scheduledAt, duration, markPerQuestion } = req.body
    const { error } = createExamValidation.validate(req.body)
    if (error) throw new AppError(error.message, 400)
    const exam = await ExamModel.create({
        prof_id: req.user.id,
        subject_name,
        topic_name,
        markPerQuestion,
        questions,
        scheduledAt,
        duration
    })
    res.status(201).json({
        status: "Success",
        data: { exam }
    })
})

// @desc Update Exams
// @route PUT /api/exams/updateExam/:exam_id
// @access private
const updateExams = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    
})

// @desc Update Exams
// @route DELETE /api/exams/deleteExam/:exam_id
// @access private
const deleteExams = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
})

export { showExams, createExams, updateExams, deleteExams }