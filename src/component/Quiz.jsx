/* eslint-disable react/prop-types */
import { useState } from "react";
import { resultInitialState } from "../constant/quiz";

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answerIndex, setAnswerIndex] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [result, setResult] = useState(resultInitialState);
  const [showResult, setShowResult] = useState(false);

  const { question, choices, correctAnswer } = questions[currentQuestion];

  const onAnswerClick = (answer, index) => {
    setAnswerIndex(index);
    setAnswer(answer === correctAnswer);
  };

  const onClickNext = () => {
    setAnswerIndex(null);
    setResult((prev) => ({
      ...prev,
      score: answer ? prev.score + 5 : prev.score,
      correctAnswers: answer ? prev.correctAnswers + 1 : prev.correctAnswers,
      wrongAnswers: !answer ? prev.wrongAnswers + 1 : prev.wrongAnswers,
    }));

    if (currentQuestion !== questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const onTryAgain = () => {
    setResult(resultInitialState);
    setShowResult(false);
    setCurrentQuestion(0);
  };

  const QuestionCard = () => (
    <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-white mb-4">{question}</h2>
      <div className="space-y-4">
        {choices.map((choice, index) => (
          <button
            key={choice}
            onClick={() => onAnswerClick(choice, index)}
            className={`w-full p-4 text-left rounded-md transition-colors ${
              answerIndex === index
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-200 hover:bg-gray-600"
            }`}
          >
            {choice}
          </button>
        ))}
      </div>
      <div className="mt-8 flex justify-between items-center">
        <span className="text-gray-400">
          Question {currentQuestion + 1}/{questions.length}
        </span>
        <button
          onClick={onClickNext}
          disabled={answerIndex === null}
          className={`px-6 py-2 rounded-md ${
            answerIndex === null
              ? "bg-gray-600 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
  );

  const ResultCard = () => (
    <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-8 text-center">
      <h3 className="text-3xl font-bold text-white mb-6">Your Results</h3>
      <div className="space-y-4 text-xl text-gray-300">
        <p>
          Total Questions:{" "}
          <span className="font-bold text-blue-400">{questions.length}</span>
        </p>
        <p>
          Total Score:{" "}
          <span className="font-bold text-blue-400">{result.score}</span>
        </p>
        <p>
          Correct Answers:{" "}
          <span className="font-bold text-green-400">
            {result.correctAnswers}
          </span>
        </p>
        <p>
          Wrong Answers:{" "}
          <span className="font-bold text-red-400">{result.wrongAnswers}</span>
        </p>
      </div>
      <button
        onClick={onTryAgain}
        className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 flex items-center justify-center p-4">
      {showResult ? <ResultCard /> : <QuestionCard />}
    </div>
  );
};

export default Quiz;
