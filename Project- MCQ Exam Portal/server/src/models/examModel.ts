import { Schema, model, Types } from "mongoose";

interface IExam {
    prof_id: Types.ObjectId,
    subject_name: string,
    total_questions: number,
    total_time: number,
    scheduled_at: Date,
    allocated_to: string[],
    questions: string[],
    answers: string[]
}

const examModelSchema = new Schema<IExam>({
    prof_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    subject_name: {
        type: Schema.Types.String,
        required: [true, "Subject Name Is Required.."]
    },
    total_questions: {
        type: Schema.Types.Number,
        required: [true, "Total Questions Quantity Required.."]
    },
    total_time: {
        type: Schema.Types.Number,
        required: [true, "Total Time Required..(Enter In Minutes)"]
    },
    scheduled_at: {
        type: Schema.Types.Date,
        required: [true, "Schedule Date Required.."]
    },
    allocated_to: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    questions: [{ type: Schema.Types.String, select: false }],
    answers: [{ type: Schema.Types.String, select: false }]
}, { timestamps: true })

const ExamModel = model('Exam', examModelSchema)

export default ExamModel