import React, { useState, useEffect } from 'react';

interface Question {
    questionText: string;
    options: { text: string; isCorrect: boolean }[];
}

interface ExamCardProps {
    question: Question;
    onNext: () => void;
    onPrevious: () => void;
    currentQuestionIndex: number;
    totalQuestions: number;
}

const ExamCard: React.FC<ExamCardProps> = ({ question, onNext, onPrevious, currentQuestionIndex, totalQuestions }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [timeLeft, setTimeLeft] = useState<number>(30);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleOptionChange = (option: string) => {
        setSelectedOption(option);
    };

    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
            <div className="flex justify-between items-center mb-4">
                <div className="text-xl font-semibold">Question {currentQuestionIndex + 1}/{totalQuestions}</div>
                <div className="text-red-500 font-bold">Time Left: {timeLeft}s</div>
            </div>
            <div className="mb-4">
                <p className="text-lg font-medium">{question.questionText}</p>
            </div>
            <div className="mb-4">
                {question.options.map((option, index) => (
                    <label key={index} className="block">
                        <input
                            type="radio"
                            name="option"
                            value={option.text}
                            checked={selectedOption === option.text}
                            onChange={() => handleOptionChange(option.text)}
                            className="mr-2"
                        />
                        {option.text}
                    </label>
                ))}
            </div>
            <div className="flex justify-between">
                <button
                    onClick={onPrevious}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    disabled={currentQuestionIndex === 0}
                >
                    Previous
                </button>
                <button
                    onClick={onNext}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    disabled={currentQuestionIndex === totalQuestions - 1}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ExamCard;