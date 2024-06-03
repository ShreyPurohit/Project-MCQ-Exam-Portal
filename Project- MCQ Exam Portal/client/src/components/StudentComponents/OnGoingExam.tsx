import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { IExam } from "../../interfaces/examInterface"

const OnGoingExamComponent = () => {
    const { exam_id } = useParams()
    const [exam, setExam] = useState<IExam>()
    const [duration, setDuration] = useState<number>()
    const [totalQuestions, setTotalQuestions] = useState<number>()
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    useEffect(() => {
        async function get() {
            const response = await axios.get(`http://localhost:3010/api/result/myExams/${exam_id}`,
                { withCredentials: true, headers: { 'Authorization': `Bearer ${document.cookie.slice(4)}` } })
            setExam(response.data.data)
            setDuration(response.data.data.duration)
            setTotalQuestions(response.data.data.questions.length)
        }
        get()
    }, [])

    const handleNext = () => {
        if (currentQuestionIndex < Number(totalQuestions)) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
                <div className="flex justify-between items-center mb-4">
                    <div className="text-xl font-semibold">Question {currentQuestionIndex + 1}/{totalQuestions}</div>
                    <div className="text-red-500 font-bold">Time Left: {duration}s</div>
                    <div className="mb-4">
                        <p className="text-lg font-medium">{totalQuestions}</p>
                    </div>
                    <div className="mb-4">
                        <div className="flex justify-between">
                            <button
                                onClick={handlePrevious}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                disabled={currentQuestionIndex === 0}
                            >
                                Previous
                            </button>
                            <button
                                onClick={handleNext}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                disabled={currentQuestionIndex === Number(totalQuestions) - 1}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OnGoingExamComponent