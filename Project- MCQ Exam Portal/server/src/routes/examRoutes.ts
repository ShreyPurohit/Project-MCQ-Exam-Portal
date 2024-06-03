import express from "express";
import { createExams, deleteExams, showExams, updateExams, getParticularExam } from '../controllers/examController'

const router = express.Router()
router.route("/myExams").get(showExams)
router.route("/createExam").post(createExams)
router.route("/myExams/:exam_id").put(updateExams).delete(deleteExams).get(getParticularExam)

export default router