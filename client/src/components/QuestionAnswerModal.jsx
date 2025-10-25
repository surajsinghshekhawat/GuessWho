import React from "react";

const QuestionAnswerModal = ({ 
  isOpen, 
  onClose, 
  question, 
  onAnswer 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
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
              Answer the Question
            </h2>
            <p className="text-white/90">
              Your opponent is asking you a question
            </p>
          </div>
        </div>

        {/* Question */}
        <div className="p-6">
          <div className="bg-yellow-100 rounded-xl p-6 border-2 border-yellow-300">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Question:</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              "{question || 'No question provided'}"
            </p>
          </div>
        </div>

        {/* Answer Buttons */}
        <div className="p-6 pt-0">
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => onAnswer(true)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <div className="text-2xl mb-1">✓</div>
              <div className="text-lg">YES</div>
            </button>
            
            <button
              onClick={() => onAnswer(false)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <div className="text-2xl mb-1">✕</div>
              <div className="text-lg">NO</div>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 border-t">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Answer honestly based on your secret character
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionAnswerModal;