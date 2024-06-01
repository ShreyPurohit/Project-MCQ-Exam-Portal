import { Schema, model, Types } from "mongoose";

interface IExam {
    prof_id: Types.ObjectId,
    subject_name: string,
    topic_name: string,
    questions: [string],
    scheduledAt: Date,
    duration: number,
    markPerQuestion: number
}

const examModelSchema = new Schema<IExam>({
    prof_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    subject_name: { type: Schema.Types.String, required: true },
    topic_name: { type: Schema.Types.String, required: true },
    questions: [{
        questionText: { type: Schema.Types.String, required: true },
        options: [{
            text: { type: Schema.Types.String, required: true },
            isCorrect: { type: Schema.Types.Boolean, required: true }
        }]
    }],
    scheduledAt: {
        type: Schema.Types.Date
    },
    duration: {
        type: Schema.Types.Number
    },
    markPerQuestion: {
        type: Schema.Types.Number
    }
}, { timestamps: true })

const ExamModel = model('Exam', examModelSchema)

export default ExamModel
