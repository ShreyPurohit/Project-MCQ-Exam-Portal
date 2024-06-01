//'Authorization': `Bearer ${document.cookie.slice(4)}`

import { useState } from "react";
import axios from "axios";

const CreateExamComponent = () => {
    const [subject_name, setSubject] = useState<string>("")
    const [topic_name, setTopic] = useState<string>("")
    const [duration, setDuration] = useState<number>(0)
    const [markPerQuestion, setMarkPerQuestion] = useState<number>(0)
    const [scheduledAt, setScheduledAt] = useState<string>('1999-12-31T24:00:00')
    const [questions, setQuestions] = useState([
        { questionText: '', options: [{ text: '', isCorrect: false }] }
    ])

    const handleQuestionChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedQuestions = questions.map((question, qIndex) =>
            index === qIndex ? { ...question, questionText: e.target.value } : question
        );
        setQuestions(updatedQuestions);
    }

    const handleOptionChange = (qIndex: number, oIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedQuestions = questions.map((question, questionIndex) =>
            qIndex === questionIndex
                ? {
                    ...question,
                    options: question.options.map((option, optionIndex) =>
                        oIndex === optionIndex ? { ...option, text: e.target.value } : option
                    )
                } : question
        )
        setQuestions(updatedQuestions)
    }


    const handleCorrectChange = (qIndex: number, oIndex: number) => {
        const updatedQuestions = questions.map((question, questionIndex) =>
            qIndex === questionIndex
                ? {
                    ...question,
                    options: question.options.map((option, optionIndex) =>
                        oIndex === optionIndex
                            ? {
                                ...option, isCorrect: !option.isCorrect
                            } : option
                    )
                }
                : question
        )
        setQuestions(updatedQuestions)
    }

    const addQuestion = () => {
        setQuestions([...questions, { questionText: '', options: [{ text: '', isCorrect: false }] }])
    }

    const addOption = (qIndex: number) => {
        const updatedQuestions = questions.map((question, questionIndex) =>
            qIndex === questionIndex
                ? {
                    ...question, options: [...question.options, { text: '', isCorrect: false }]
                } : question
        )
        setQuestions(updatedQuestions)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const examData = { subject_name, topic_name, duration, scheduledAt, questions, markPerQuestion }
        try {
            const response = await axios.post("http://localhost:3010/api/exams/createExam", examData, {
                withCredentials: true,
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${document.cookie.slice(4)}`
                }
            })
            console.log("Exam Created", response.data);
        } catch (error) {
            console.error("Error Conducting Exam", error);
        }
    }

    return (
        <div className="mt-9 text-center">
            <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                <h3 className="font-bold text-center text-4xl mb-3 text-orange-400">Create Exam</h3>
                <div className="mb-4">
                    <label htmlFor="subject_name" className="block text-gray-700 text-sm font-bold mb-2">Subject: </label>
                    <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="subject_name" value={subject_name} onChange={(e) => setSubject(e.target.value)} required />
                </div>
                <div className="mb-4">
                    <label htmlFor="topic_name" className="block text-gray-700 text-sm font-bold mb-2">Topic: </label>
                    <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="topic_name" value={topic_name} onChange={(e) => setTopic(e.target.value)} required />
                </div>
                <div className="mb-4">
                    <label htmlFor="duration" className="block text-gray-700 text-sm font-bold mb-2">Duration: </label>
                    <input type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="duration" value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
                </div>
                <div className="mb-4">
                    <label htmlFor="scheduleAt" className="block text-gray-700 text-sm font-bold mb-2">Schedule At: </label>
                    <input type="datetime-local" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="scheduleAt" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label htmlFor="mark" className="block text-gray-700 text-sm font-bold mb-2">Marks Per Question: </label>
                    <input type="number" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="mark" value={markPerQuestion} onChange={(e) => setMarkPerQuestion(+(e.target.value))} />
                </div>
                {questions.map((question, qIndex) => (
                    <div key={qIndex}>
                        <label htmlFor="queston_number" className="block text-gray-700 text-xl font-bold mb-2">Question {qIndex + 1}</label>
                        <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="question_text" value={question.questionText} onChange={(e) => handleQuestionChange(qIndex, e)} />
                        <button type="button" className=" bg-green-100 border-2  text-black self-center hover:bg-green-500 rounded-md p-1" onClick={() => addOption(qIndex)}> Add Option </button>
                        {question.options.map((option, oIndex) => (
                            <div key={oIndex}>
                                <label htmlFor="option" className="block text-gray-700 text-sm font-bold mb-2">Option {oIndex + 1}</label>
                                <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-4" name="option" value={option.text} onChange={(e) => handleOptionChange(qIndex, oIndex, e)} />
                                <label className="inline-flex items-center text-green-500">
                                    <input type="checkbox" className="form-checkbox text-green-500" checked={option.isCorrect} onChange={() => handleCorrectChange(qIndex, oIndex)} />
                                    <span className="ml-2">Correct</span>
                                </label>
                            </div>
                        ))}
                    </div>
                ))}
                <div className="flex flex-col mt-5">
                    <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4" onClick={addQuestion}>Add Quesiton</button>
                    <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create Exam</button>
                </div>
            </form>
        </div>
    )
}

export default CreateExamComponent