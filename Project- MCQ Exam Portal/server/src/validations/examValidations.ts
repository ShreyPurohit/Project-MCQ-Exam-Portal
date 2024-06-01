import Joi from 'joi'

const optionSchema = Joi.object({
    text: Joi.string().required(),
    isCorrect: Joi.boolean().required()
});

const questionSchema = Joi.object({
    questionText: Joi.string().required(),
    options: Joi.array().items(optionSchema).min(1).required()
});

const createExamValidation = Joi.object({
    subject_name: Joi.string().required(),
    topic_name: Joi.string().required(),
    questions: Joi.array().items(questionSchema).min(1).required(),
    scheduledAt: Joi.date(),
    markPerQuestion: Joi.number(),
    duration: Joi.number()
});

export { createExamValidation }