import { useState } from 'react';
import ExamCard from './ExamCard';

const questions = [
    {
        questionText: 'What is 2 + 2?',
        options: [
            { text: '3', isCorrect: false },
            { text: '4', isCorrect: true },
            { text: '5', isCorrect: false },
            { text: '6', isCorrect: false }
        ]
    },
    {
        questionText: 'What is 3 * 3?',
        options: [
            { text: '6', isCorrect: false },
            { text: '9', isCorrect: true },
            { text: '12', isCorrect: false },
            { text: '15', isCorrect: false }
        ]
    }
    // Add more questions as needed
];

const MCQExam = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
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
            <ExamCard
                question={questions[currentQuestionIndex]}
                onNext={handleNext}
                onPrevious={handlePrevious}
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={questions.length}
            />
        </div>
    );
};

export default MCQExam;