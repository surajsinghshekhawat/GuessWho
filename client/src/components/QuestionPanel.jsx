import React, { useState } from "react";

const SUGGESTED_QUESTIONS = [
  "Is your person male?",
  "Does your person wear glasses?",
  "Is your person blonde?",
  "Does your person have facial hair?",
  "Is your person wearing a hat?",
  "Does your person have blue eyes?",
  "Is your person smiling?",
  "Does your person have long hair?",
  "Is your person wearing red?",
  "Does your person have a beard?",
  "Is your person young?",
  "Does your person have dark hair?",
  "Is your person wearing jewelry?",
  "Does your person have curly hair?",
  "Is your person wearing a suit?",
  "Does your person have a mustache?",
  "Is your person wearing glasses?",
  "Does your person have short hair?",
  "Is your person wearing a dress?",
  "Does your person have brown eyes?",
];

const QuestionPanel = ({
  isMyTurn,
  pendingQuestion,
  onAskQuestion,
  onAnswerQuestion,
  currentPlayer,
  players,
}) => {
  const [question, setQuestion] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    onAskQuestion(question.trim());
    setQuestion("");
  };

  const handleSuggestedQuestion = (suggestedQuestion) => {
    setQuestion(suggestedQuestion);
    setShowSuggestions(false);
  };

  const handleAnswer = (answer) => {
    onAnswerQuestion(answer);
  };

  const opponent = players.find((p) => p.id !== currentPlayer.id);

  if (pendingQuestion) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Answer the Question
        </h3>

        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-800 font-medium">"{pendingQuestion}"</p>
          <p className="text-sm text-blue-600 mt-1">
            Asked by {opponent?.username}
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => handleAnswer(true)}
            className="w-full btn-primary"
          >
            Yes
          </button>
          <button
            onClick={() => handleAnswer(false)}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            No
          </button>
        </div>
      </div>
    );
  }

  if (!isMyTurn) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Waiting for Turn
        </h3>
        <div className="text-center py-8">
          <div className="animate-pulse-slow text-4xl mb-4">⏳</div>
          <p className="text-gray-600">
            Waiting for {opponent?.username} to ask a question...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Ask a Question
      </h3>

      <form onSubmit={handleSubmitQuestion} className="space-y-4">
        <div>
          <label
            htmlFor="question"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Your Question
          </label>
          <div className="relative">
            <input
              type="text"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Ask a yes/no question..."
              required
            />
            <button
              type="button"
              onClick={() => setShowSuggestions(!showSuggestions)}
              className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
            >
              💡
            </button>
          </div>
        </div>

        {showSuggestions && (
          <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
              Suggested Questions:
            </h4>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {SUGGESTED_QUESTIONS.map((suggested, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestedQuestion(suggested)}
                  className="block w-full text-left text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 px-2 py-1 rounded"
                >
                  {suggested}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={!question.trim()}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Ask Question
        </button>
      </form>

      <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Tip:</strong> Ask questions that help eliminate many
          characters at once!
        </p>
      </div>
    </div>
  );
};

export default QuestionPanel;


