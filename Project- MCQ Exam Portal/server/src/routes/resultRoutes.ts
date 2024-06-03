import express from "express";
import { getExams, takeExam, getParticularExam } from '../controllers/resultController'

const router = express.Router()
router.route("/myExams").get(getExams)
router.route("/myExams/:exam_id").get(getParticularExam)

export default router