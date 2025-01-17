// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-hot-toast'; // Import react-hot-toast for notifications
// import { Toaster } from 'react-hot-toast'; // Import Toaster for displaying toasts
// import './QuizPage.css'; // Import CSS file for styling

// const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:5000'; // Configurable base URL

// const QuizPage = () => {
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [userId, setUserId] = useState('67571162354d8baf9cec174e'); // Example userId
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/api/quiz/questions`);
//         setQuestions(response.data);
//       } catch (err) {
//         console.error('Error fetching questions', err);
//         toast.error('Failed to load questions. Please try again later!', { position: 'top-center' });
//       }
//     };

//     fetchQuestions();
//   }, []);

//   const handleOptionSelect = (option) => {
//     setSelectedOption(option);
//   };

//   const handleNextQuestion = async () => {
//     if (selectedOption === null) {
//       toast.error('Please select an option before moving to the next question.', { position: 'top-center' });
//       return;
//     }

//     const currentQuestion = questions[currentQuestionIndex];
//     const responseData = {
//       questionId: currentQuestion._id,
//       selectedOption: selectedOption,
//       userId: userId,
//     };

//     try {
//       await axios.post(`${BASE_URL}/api/quiz/responses`, responseData);
//       toast.success('Response submitted successfully!', { position: 'top-center' });
//     } catch (err) {
//       console.error('Error submitting response', err);
//       toast.error('Failed to submit the response. Please try again!', { position: 'top-center' });
//     }

//     setCurrentQuestionIndex((prev) => prev + 1);
//     setSelectedOption(null);
//   };

//   const handleSubmitQuiz = async () => {
//     if (selectedOption === null) {
//       toast.error('Please select an option before submitting the quiz.', { position: 'top-center' });
//       return;
//     }

//     const currentQuestion = questions[currentQuestionIndex];
//     const responseData = {
//       questionId: currentQuestion._id,
//       selectedOption: selectedOption,
//       userId: userId,
//     };

//     try {
//       await axios.post(`${BASE_URL}/api/quiz/responses`, responseData);
//       toast.success('Quiz submitted successfully!', {
//         position: 'top-center',
//         duration: 3000,
//         onClose: () => {
//           toast('Redirecting to results page...', { position: 'top-center', duration: 2000 });
//         },
//       });

//       setTimeout(() => navigate('/view-results'), 3000); // Redirect to results after 3 seconds
//     } catch (err) {
//       console.error('Error submitting quiz', err);
//       toast.error('Failed to submit the quiz. Please try again!', { position: 'top-center' });
//     }
//   };

//   if (questions.length === 0) return <p>Loading questions...</p>;

//   const currentQuestion = questions[currentQuestionIndex];
//   const isLastQuestion = currentQuestionIndex === questions.length - 1;

//   return (
//     <div className="quiz-container">
//       <div className="progress-bar">
//         <div
//           className="progress"
//           style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
//         ></div>
//       </div>
//       <div className="question-card">
//         <h2 className="question-number">Question {currentQuestion.number}</h2>
//         <p className="question-text">{currentQuestion.text}</p>
//         <div className="options-container">
//           {currentQuestion.options.map((option, index) => (
//             <div
//               key={index}
//               className={`option-card ${selectedOption === option ? 'selected' : ''}`}
//               onClick={() => handleOptionSelect(option)}
//             >
//               <input
//                 type="radio"
//                 name="option"
//                 id={`option-${index}`}
//                 value={option}
//                 checked={selectedOption === option}
//                 onChange={() => handleOptionSelect(option)}
//                 className="radio-input"
//               />
//               <label htmlFor={`option-${index}`} className="option-label">
//                 {option}
//               </label>
//             </div>
//           ))}
//         </div>
//         <div className="quiz-buttons">
//           {!isLastQuestion ? (
//             <button className="next-button" onClick={handleNextQuestion}>
//               Next
//             </button>
//           ) : (
//             <button className="submit-button" onClick={handleSubmitQuiz}>
//               Submit Quiz
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Toast notifications */}
//       <Toaster />
//     </div>
//   );
// };

// export default QuizPage;

REACT_APP_API_BASE_URL

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import './QuizPage.css'; // Import CSS file for styling

// Define the base API URL dynamically based on the environment
const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://survey-app-b003.onrender.com' // Production API URL
  : 'http://127.0.0.1:5000'; // Local development API URL

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState('67571162354d8baf9cec174e'); // Example userId
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/quiz/questions`);
        setQuestions(response.data);
      } catch (err) {
        console.error('Error fetching questions', err);
        setError('Failed to load questions. Please try again later!');
        toast.error('Failed to load questions. Please try again later!');
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = async () => {
    if (selectedOption === null) {
      toast.error('Please select an option before moving to the next question.');
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const responseData = {
      questionId: currentQuestion._id,
      selectedOption: selectedOption,
      userId: userId,
    };

    try {
      await axios.post(`${API_BASE_URL}/api/quiz/responses`, responseData);
      toast.success('Response submitted successfully!');
    } catch (err) {
      console.error('Error submitting response', err);
      toast.error('Failed to submit the response. Please try again!');
    }

    setCurrentQuestionIndex((prev) => prev + 1);
    setSelectedOption(null);
  };

  const handleSubmitQuiz = async () => {
    if (selectedOption === null) {
      toast.error('Please select an option before submitting the quiz.');
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    const responseData = {
      questionId: currentQuestion._id,
      selectedOption: selectedOption,
      userId: userId,
    };

    try {
      await axios.post(`${API_BASE_URL}/api/quiz/responses`, responseData);
      toast.success('Quiz submitted successfully!', {
        duration: 3000,
        onClose: () => {
          toast('Redirecting to results page...', {
            duration: 2000,
          });
        },
      });

      setTimeout(() => navigate('/view-results'), 3000); // Redirect to results after 3 seconds
    } catch (err) {
      console.error('Error submitting quiz', err);
      toast.error('Failed to submit the quiz. Please try again!');
    }
  };

  if (questions.length === 0) return <p>Loading questions...</p>;

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="quiz-page-container">
      <Toaster />
      <div className="quiz-card">
        <h2 className="quiz-title">Quiz</h2>
        <div className="progress-bar">
          <div
            className="progress"
            style={{
              width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
            }}
          ></div>
        </div>
        <div className="question-card">
          <h3 className="question-number">Question {currentQuestion.number}</h3>
          <p className="question-text">{currentQuestion.text}</p>
          <div className="options-container">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className={`option-card ${selectedOption === option ? 'selected' : ''}`}
                onClick={() => handleOptionSelect(option)}
              >
                <input
                  type="radio"
                  name="option"
                  id={`option-${index}`}
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleOptionSelect(option)}
                  className="radio-input"
                />
                <label htmlFor={`option-${index}`} className="option-label">
                  {option}
                </label>
              </div>
            ))}
          </div>
          <div className="quiz-buttons">
            {!isLastQuestion ? (
              <button
                type="button"
                className="next-button"
                onClick={handleNextQuestion}
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                className="submit-button"
                onClick={handleSubmitQuiz}
              >
                Submit Quiz
              </button>
            )}
          </div>
          {error && <p className="error-text">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;



