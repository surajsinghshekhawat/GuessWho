import React from "react";

const AnswerModal = ({ isOpen, question, answer, onContinue, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md mx-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Question Answered
        </h2>

        <div className="mb-4">
          <p className="text-gray-600 mb-2">
            <strong>Your Question:</strong> {question}
          </p>
          <p className="text-gray-600">
            <strong>Answer:</strong>
            <span className="ml-2 px-2 py-1 rounded text-white bg-blue-500">
              {answer === true ? "Yes" : answer === false ? "No" : answer}
            </span>
          </p>
        </div>

        <p className="text-gray-600 mb-4">
          Now flip your cards based on this answer, then click "Continue" to end
          your turn.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onContinue}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Continue
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnswerModal;
