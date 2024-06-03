export interface IExam {
    _id: string,
    subject_name: string,
    topic_name: string,
    questions: [
        questionText: string,
        options: [{ text: string, isCorrect: boolean }]
    ],
    scheduledAt: Date,
    duration: number,
    markPerQuestion: number,
    createdAt: Date
}