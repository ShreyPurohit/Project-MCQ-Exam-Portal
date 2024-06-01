export interface IExam {
    _id: string,
    subject_name: string,
    topic_name: string,
    questions: [string],
    scheduledAt: Date,
    duration: number,
    markPerQuestion: number,
    createdAt: Date
}