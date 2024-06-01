import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateExamForm = () => {
    const { examId } = useParams();
    const navigate = useNavigate();
    const [subject, setSubject] = useState('');
    const [topic, setTopic] = useState('');
    const [questions, setQuestions] = useState([
        { questionText: '', options: [{ text: '', isCorrect: false }] }
    ]);

    useEffect(() => {
        const fetchExamData = async () => {
            try {
                const response = await axios.get(`http://localhost:3010/api/exams/${examId}`, {
                    withCredentials: true
                });
                const exam = response.data;
                setSubject(exam.subject);
                setTopic(exam.topic);
                setQuestions(exam.questions);
            } catch (error) {
                console.error('Error fetching exam data:', error);
            }
        };

        fetchExamData();
    }, [examId]);

    const handleQuestionChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedQuestions = questions.map((question, qIndex) =>
            index === qIndex ? { ...question, questionText: event.target.value } : question
        );
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (qIndex: number, oIndex: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedQuestions = questions.map((question, questionIndex) =>
            qIndex === questionIndex
                ? {
                    ...question,
                    options: question.options.map((option, optionIndex) =>
                        oIndex === optionIndex ? { ...option, text: event.target.value } : option
                    )
                }
                : question
        );
        setQuestions(updatedQuestions);
    };

    const handleCorrectChange = (qIndex: number, oIndex: number) => {
        const updatedQuestions = questions.map((question, questionIndex) =>
            qIndex === questionIndex
                ? {
                    ...question,
                    options: question.options.map((option, optionIndex) =>
                        oIndex === optionIndex ? { ...option, isCorrect: !option.isCorrect } : option
                    )
                }
                : question
        );
        setQuestions(updatedQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { questionText: '', options: [{ text: '', isCorrect: false }] }]);
    };

    const addOption = (qIndex: number) => {
        const updatedQuestions = questions.map((question, questionIndex) =>
            qIndex === questionIndex
                ? { ...question, options: [...question.options, { text: '', isCorrect: false }] }
                : question
        );
        setQuestions(updatedQuestions);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const examData = { subject, topic, questions };
        try {
            const response = await axios.put(`http://localhost:3010/api/exams/${examId}`, examData, {
                withCredentials: true,
                headers: { 'Content-Type': 'application/json' }
            });
            console.log('Exam updated:', response.data);
            navigate('/faculty');
        } catch (error) {
            console.error('Error updating exam:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Subject:</label>
                <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required />
            </div>
            <div>
                <label>Topic:</label>
                <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} required />
            </div>
            {questions.map((question, qIndex) => (
                <div key={qIndex}>
                    <div>
                        <label>Question {qIndex + 1}:</label>
                        <input
                            type="text"
                            value={question.questionText}
                            onChange={(e) => handleQuestionChange(qIndex, e)}
                            required
                        />
                        <button type="button" onClick={() => addOption(qIndex)}>Add Option</button>
                    </div>
                    {question.options.map((option, oIndex) => (
                        <div key={oIndex}>
                            <label>Option {oIndex + 1}:</label>
                            <input
                                type="text"
                                value={option.text}
                                onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                                required
                            />
                            <label>
                                <input
                                    type="checkbox"
                                    checked={option.isCorrect}
                                    onChange={() => handleCorrectChange(qIndex, oIndex)}
                                />
                                Correct
                            </label>
                        </div>
                    ))}
                </div>
            ))}
            <button type="button" onClick={addQuestion}>Add Question</button>
            <button type="submit">Update Exam</button>
        </form>
    );
};

export default UpdateExamForm;