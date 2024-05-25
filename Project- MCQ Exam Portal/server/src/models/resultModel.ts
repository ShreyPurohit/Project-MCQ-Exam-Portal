import { Schema, Types, model } from "mongoose";

interface IResult {
    exam_id: Types.ObjectId,
    taken_by: Types.ObjectId
}

const resultModelSchema = new Schema<IResult>({
    exam_id: {
        type: Schema.Types.ObjectId,
        ref: "Exam",
        required: true
    },
    taken_by: [{
        key: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        value: Schema.Types.Number
    }]
}, { timestamps: true })

const ResultModel = model('Result', resultModelSchema)

export default ResultModel