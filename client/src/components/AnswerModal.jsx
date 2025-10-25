import React from "react";

const AnswerModal = ({ 
  isOpen, 
  onClose, 
  question, 
  answer 
}) => {
  if (!isOpen) return null;

  const answerText = answer ? "Yes" : "No";
  const answerColor = answer ? "from-green-500 to-green-600" : "from-red-500 to-red-600";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full">
        {/* Header */}
        <div className="bg-red-500 p-6 relative overflow-hidden">
          {/* Background Pattern - Random Blue Question Marks */}
          <div className="absolute inset-0 opacity-30">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute text-blue-500 text-lg font-bold"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                  fontSize: `${12 + Math.random() * 8}px`,
                }}
              >
                ?
              </div>
            ))}
          </div>
          
          <div className="relative z-10 text-center">
            <h2 className="text-2xl font-bold text-white drop-shadow-lg mb-2">
              Question Answered
            </h2>
            <p className="text-white/90">
              Your opponent has answered your question
            </p>
          </div>
        </div>

        {/* Question and Answer */}
        <div className="p-6">
          <div className="bg-yellow-100 rounded-xl p-6 border-2 border-yellow-300 mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Question:</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              "{question || 'No question provided'}"
            </p>
          </div>

          <div className={`${answer ? 'bg-green-500' : 'bg-red-500'} rounded-xl p-6 text-center`}>
            <h3 className="text-lg font-semibold text-white mb-2">Answer:</h3>
            <p className="text-white text-3xl font-bold">
              {answerText}
            </p>
          </div>
        </div>

        {/* Continue Button */}
        <div className="p-6 pt-0">
          <button
            onClick={onClose}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Continue Playing
          </button>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 border-t">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Now eliminate characters based on this answer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnswerModal;