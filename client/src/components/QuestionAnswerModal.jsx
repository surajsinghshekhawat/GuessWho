import React from "react";

const QuestionAnswerModal = ({
  isOpen,
  question,
  askingPlayer,
  onAnswer,
  onClose,
  isMyTurn,
}) => {
  if (!isOpen) return null;

  const handleAnswer = (answer) => {
    onAnswer(answer);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md mx-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">
            Question Asked!
          </h2>

          <div className="mb-6">
            <p className="text-gray-600 mb-2">Your opponent asks:</p>
            <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
              <p className="text-lg font-medium text-blue-800">"{question}"</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-gray-600 mb-4">Answer:</p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleAnswer(true)}
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors text-lg font-medium"
              >
                Yes
              </button>
              <button
                onClick={() => handleAnswer(false)}
                className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 transition-colors text-lg font-medium"
              >
                No
              </button>
            </div>
          </div>

          <p className="text-sm text-gray-500">
            Answer truthfully based on your secret character
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuestionAnswerModal;

