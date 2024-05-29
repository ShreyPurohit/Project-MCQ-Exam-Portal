import { NextFunction, Request, Response } from "express";
import asyncHandler from 'express-async-handler'

import { AppError } from "../middlewares/errorHandler";

import ExamModel from "../models/examModel";

// @desc Show Exams
// @route GET /api/exams/myExams
// @access private
const showExams = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        message: "success"
    })
})

// @desc Create Exams
// @route POST /api/exams/createExam
// @access private
const createExams = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const {
        subject_name,
        total_questions,
        total_time,
        scheduled_at,
        allocated_to,
        questions,
        answers
    } = req.body

    const exam = await ExamModel.create({
        prof_id: req.user.id,
        subject_name,
        total_questions,
        total_time,
        scheduled_at,
        allocated_to,
        questions,
        answers
    })
    res.status(201).json({
        status: "Success",
        message: "Exam Added Successfully",
        data: { exam }
    })

})

// @desc Update Exams
// @route PUT /api/exams/updateExam/:exam_id
// @access private
const updateExams = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

})

// @desc Update Exams
// @route DELETE /api/exams/deleteExam/:exam_id
// @access private
const deleteExams = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

})

export { showExams, createExams, updateExams, deleteExams }