import express from "express";
import { createExams, deleteExams, showExams, updateExams } from '../controllers/examController'
import restrictTo from "../middlewares/roleHandler";

const router = express.Router()
router.use(restrictTo('faculty'))
router.route("/myExams").get(showExams)
router.route("/createExam").post(createExams)
router.route("/myExams/:exam_id").put(updateExams).delete(deleteExams)

export default router