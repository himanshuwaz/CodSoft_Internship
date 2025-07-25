import React, { useState, useEffect } from 'react';

// Tailwind CSS is assumed to be available.

// Inline SVG Icons (simplified for demonstration)
const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
);

const PlusCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2">
        <circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/>
    </svg>
);

const ListIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2">
        <line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/>
    </svg>
);

// --- Components ---

// Navbar Component
const Navbar = ({ setCurrentPage }) => {
    return (
        <nav className="bg-gray-800 p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-2xl font-bold rounded-md px-3 py-1 bg-indigo-600">
                    QuizMaster
                </div>
                <div className="flex space-x-4">
                    <button
                        onClick={() => setCurrentPage('home')}
                        className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                        <HomeIcon /> Home
                    </button>
                    <button
                        onClick={() => setCurrentPage('createQuiz')}
                        className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                        <PlusCircleIcon /> Create Quiz
                    </button>
                    <button
                        onClick={() => setCurrentPage('quizListing')}
                        className="flex items-center text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                        <ListIcon /> Take Quiz
                    </button>
                </div>
            </div>
        </nav>
    );
};

// Home Page Component
const HomePage = ({ setCurrentPage }) => {
    return (
        <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center p-4">
            <div className="text-center text-white max-w-4xl mx-auto bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-xl shadow-2xl border border-white border-opacity-20">
                <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg">
                    Unleash Your Knowledge with QuizMaster!
                </h1>
                <p className="text-xl md:text-2xl mb-10 opacity-90">
                    Create engaging quizzes or challenge yourself with quizzes made by others.
                    Learning made fun and interactive.
                </p>
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <button
                        onClick={() => setCurrentPage('createQuiz')}
                        className="bg-white text-purple-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-xl transform hover:scale-105"
                    >
                        Create a Quiz
                    </button>
                    <button
                        onClick={() => setCurrentPage('quizListing')}
                        className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-700 transition-colors duration-300 shadow-xl transform hover:scale-105"
                    >
                        Take a Quiz
                    </button>
                </div>
            </div>
        </div>
    );
};

// Quiz Creation Page Component
const CreateQuizPage = ({ setCurrentPage, addQuiz }) => {
    const [quizTitle, setQuizTitle] = useState('');
    const [questions, setQuestions] = useState([
        { questionText: '', options: ['', '', '', ''], correctAnswerIndex: 0 }
    ]);

    const handleQuestionTextChange = (index, text) => {
        const newQuestions = [...questions];
        newQuestions[index].questionText = text;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (qIndex, oIndex, text) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex] = text;
        setQuestions(newQuestions);
    };

    const handleCorrectAnswerChange = (qIndex, index) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].correctAnswerIndex = index;
        setQuestions(newQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { questionText: '', options: ['', '', '', ''], correctAnswerIndex: 0 }]);
    };

    const removeQuestion = (index) => {
        const newQuestions = questions.filter((_, i) => i !== index);
        setQuestions(newQuestions);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!quizTitle.trim()) {
            alert('Quiz title cannot be empty.');
            return;
        }
        for (const q of questions) {
            if (!q.questionText.trim()) {
                alert('All question texts must be filled.');
                return;
            }
            for (const opt of q.options) {
                if (!opt.trim()) {
                    alert('All options must be filled for each question.');
                    return;
                }
            }
        }

        const newQuiz = {
            id: Date.now().toString(), // Simple unique ID
            title: quizTitle,
            questions: questions
        };
        addQuiz(newQuiz);
        alert('Quiz created successfully!'); // Using alert for simulation as per instructions
        setCurrentPage('quizListing'); // Go to quiz listing after creation
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-[calc(100vh-64px)]">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Create New Quiz</h2>
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                <div className="mb-6">
                    <label htmlFor="quizTitle" className="block text-lg font-medium text-gray-700 mb-2">Quiz Title</label>
                    <input
                        type="text"
                        id="quizTitle"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={quizTitle}
                        onChange={(e) => setQuizTitle(e.target.value)}
                        required
                    />
                </div>

                {questions.map((q, qIndex) => (
                    <div key={qIndex} className="bg-gray-100 p-6 rounded-lg mb-6 border border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-800">Question {qIndex + 1}</h3>
                            {questions.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeQuestion(qIndex)}
                                    className="text-red-600 hover:text-red-800 font-medium"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor={`questionText-${qIndex}`} className="block text-md font-medium text-gray-700 mb-1">Question Text</label>
                            <input
                                type="text"
                                id={`questionText-${qIndex}`}
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-400"
                                value={q.questionText}
                                onChange={(e) => handleQuestionTextChange(qIndex, e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <p className="block text-md font-medium text-gray-700 mb-1">Options</p>
                            {q.options.map((option, oIndex) => (
                                <div key={oIndex} className="flex items-center mb-2">
                                    <input
                                        type="radio"
                                        id={`correct-${qIndex}-${oIndex}`}
                                        name={`correctAnswer-${qIndex}`}
                                        className="mr-2 text-purple-600 focus:ring-purple-500"
                                        checked={q.correctAnswerIndex === oIndex}
                                        onChange={() => handleCorrectAnswerChange(qIndex, oIndex)}
                                    />
                                    <label htmlFor={`correct-${qIndex}-${oIndex}`} className="sr-only">Option {oIndex + 1} is correct</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-400"
                                        placeholder={`Option ${oIndex + 1}`}
                                        value={option}
                                        onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                        required
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addQuestion}
                    className="w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-200 mb-6"
                >
                    Add Another Question
                </button>

                <button
                    type="submit"
                    className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg font-bold text-lg hover:bg-purple-700 transition-colors duration-300 shadow-md"
                >
                    Create Quiz
                </button>
            </form>
        </div>
    );
};

// Quiz Listing Page Component
const QuizListingPage = ({ setCurrentPage, quizzes, setSelectedQuizId }) => {
    const handleTakeQuiz = (quizId) => {
        setSelectedQuizId(quizId);
        setCurrentPage('takeQuiz');
    };

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-[calc(100vh-64px)]">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Available Quizzes</h2>
            {quizzes.length === 0 ? (
                <p className="text-center text-gray-600 text-lg">No quizzes available yet. Why not <button onClick={() => setCurrentPage('createQuiz')} className="text-purple-600 hover:underline font-medium">create one</button>?</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quizzes.map(quiz => (
                        <div key={quiz.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-200 flex flex-col">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{quiz.title}</h3>
                            <p className="text-gray-600 text-sm mb-4 flex-grow">{quiz.questions.length} Questions</p>
                            <button
                                onClick={() => handleTakeQuiz(quiz.id)}
                                className="bg-purple-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors duration-300 mt-auto"
                            >
                                Take Quiz
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// Take Quiz Page Component
const TakeQuizPage = ({ setCurrentPage, quizzes, selectedQuizId }) => {
    const quiz = quizzes.find(q => q.id === selectedQuizId);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [userAnswers, setUserAnswers] = useState({}); // { questionIndex: selectedOptionIndex }
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    useEffect(() => {
        if (!quiz) {
            setCurrentPage('quizListing'); // Redirect if quiz not found
        }
    }, [quiz, setCurrentPage]);

    if (!quiz) {
        return null; // Or a loading indicator
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];

    const handleOptionSelect = (optionIndex) => {
        setSelectedAnswer(optionIndex);
        setUserAnswers({ ...userAnswers, [currentQuestionIndex]: optionIndex });
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(userAnswers[currentQuestionIndex + 1] !== undefined ? userAnswers[currentQuestionIndex + 1] : null);
        } else {
            // End of quiz, calculate score and show results
            let calculatedScore = 0;
            quiz.questions.forEach((q, index) => {
                if (userAnswers[index] === q.correctAnswerIndex) {
                    calculatedScore++;
                }
            });
            setScore(calculatedScore);
            setShowResults(true);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setSelectedAnswer(userAnswers[currentQuestionIndex - 1] !== undefined ? userAnswers[currentQuestionIndex - 1] : null);
        }
    };

    const handleRetakeQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setUserAnswers({});
        setScore(0);
        setShowResults(false);
    };

    const handleBackToQuizzes = () => {
        setCurrentPage('quizListing');
    };

    if (showResults) {
        return (
            <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-[calc(100vh-64px)] flex items-center justify-center">
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-center max-w-xl w-full">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Quiz Results: {quiz.title}</h2>
                    <p className="text-3xl font-bold text-purple-700 mb-6">You scored {score} out of {quiz.questions.length}!</p>

                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Review Your Answers:</h3>
                    <div className="text-left mb-8 max-h-80 overflow-y-auto pr-2">
                        {quiz.questions.map((q, index) => (
                            <div key={index} className="mb-4 p-3 rounded-lg bg-gray-100 border border-gray-200">
                                <p className="font-semibold text-gray-800 mb-2">Q{index + 1}: {q.questionText}</p>
                                <ul className="list-none p-0 m-0">
                                    {q.options.map((option, oIndex) => {
                                        const isCorrect = oIndex === q.correctAnswerIndex;
                                        const isUserSelected = userAnswers[index] === oIndex;
                                        let className = "p-2 rounded-md mb-1 ";
                                        if (isCorrect) {
                                            className += "bg-green-100 text-green-800 font-medium";
                                        } else if (isUserSelected && !isCorrect) {
                                            className += "bg-red-100 text-red-800 font-medium";
                                        } else {
                                            className += "text-gray-700";
                                        }
                                        return (
                                            <li key={oIndex} className={className}>
                                                {option} {isCorrect && "(Correct)"} {isUserSelected && !isCorrect && "(Your Answer)"}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <button
                            onClick={handleRetakeQuiz}
                            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-700 transition-colors duration-300 shadow-md"
                        >
                            Retake Quiz
                        </button>
                        <button
                            onClick={handleBackToQuizzes}
                            className="bg-gray-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-700 transition-colors duration-300 shadow-md"
                        >
                            Back to Quizzes
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-[calc(100vh-64px)] flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 max-w-2xl w-full">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4 text-center">{quiz.title}</h2>
                <p className="text-gray-600 text-lg text-center mb-6">Question {currentQuestionIndex + 1} of {quiz.questions.length}</p>

                <div className="mb-8">
                    <p className="text-xl font-semibold text-gray-800 mb-4">{currentQuestion.questionText}</p>
                    <div className="space-y-3">
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleOptionSelect(index)}
                                className={`w-full text-left p-4 rounded-lg border-2 transition-colors duration-200
                                    ${selectedAnswer === index ? 'bg-purple-100 border-purple-600 text-purple-800' : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'}`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between mt-6">
                    <button
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestionIndex === 0}
                        className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNextQuestion}
                        disabled={selectedAnswer === null}
                        className="bg-purple-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                    >
                        {currentQuestionIndex === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                    </button>
                </div>
            </div>
        </div>
    );
};


// Main App Component
const App = () => {
    // State to manage current page and quiz data
    const [currentPage, setCurrentPage] = useState('home'); // 'home', 'createQuiz', 'quizListing', 'takeQuiz'
    const [quizzes, setQuizzes] = useState([]); // Stores all created quizzes
    const [selectedQuizId, setSelectedQuizId] = useState(null); // ID of the quiz being taken

    // Function to add a new quiz to the list
    const addQuiz = (newQuiz) => {
        setQuizzes([...quizzes, newQuiz]);
    };

    // Render content based on currentPage state
    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage setCurrentPage={setCurrentPage} />;
            case 'createQuiz':
                return <CreateQuizPage setCurrentPage={setCurrentPage} addQuiz={addQuiz} />;
            case 'quizListing':
                return <QuizListingPage setCurrentPage={setCurrentPage} quizzes={quizzes} setSelectedQuizId={setSelectedQuizId} />;
            case 'takeQuiz':
                return <TakeQuizPage setCurrentPage={setCurrentPage} quizzes={quizzes} selectedQuizId={selectedQuizId} />;
            default:
                return <HomePage setCurrentPage={setCurrentPage} />;
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar setCurrentPage={setCurrentPage} />
            {renderPage()}
        </div>
    );
};

export default App; // Export the main App component
