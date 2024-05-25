import { Schema, model } from "mongoose";

export enum EUser {
    admin = 'admin',
    faculty = 'faculty',
    student = 'student'
}

interface IUser {
    name: string,
    email: string,
    password: string,
    role: EUser,
    result_average: number,
    exams_taken: number,
    exams_conducted: number
}

const userModelSchema = new Schema<IUser>({
    name: {
        type: Schema.Types.String,
        required: [true, "Name Is Required.."]
    },
    email: {
        type: Schema.Types.String,
        required: [true, "Email ID Is Required.."],
        unique: true
    },
    password: {
        type: Schema.Types.String,
        required: [true, "Password Is Required.."],
        min: [5, "Password Must Be Greater Than Length 5.."],
        select: false
    },
    role: {
        type: Schema.Types.String,
        enum: {
            values: [EUser.admin, EUser.faculty, EUser.student],
            message: '({VALUE}) is not supported'
        }
    },
    result_average: { //Student
        type: Schema.Types.Number,
        default: 0,
        set: (val: number) => Math.round(Number(val) * 10) / 10,
        select: false
    },
    exams_taken: { //Student
        type: Schema.Types.Number,
        default: 0,
        select: false
    },
    exams_conducted: { //Faculty
        type: Schema.Types.Number,
        default: 0,
        select: false
    }
}, { timestamps: true })

const UserModel = model('User', userModelSchema)

export default UserModel