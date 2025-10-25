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
        <div className="bg-gradient-to-r from-red-500 to-blue-600 p-6 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ctext font-family='Arial' font-size='16' x='20' y='20' text-anchor='middle'%3E?%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat'
            }}></div>
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
          <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-xl p-6 border-2 border-yellow-300">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Question:</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              "{question}"
            </p>
          </div>
        </div>

        {/* Answer Buttons */}
        <div className="p-6 pt-0">
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => onAnswer(true)}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <div className="text-2xl mb-1">✓</div>
              <div className="text-lg">YES</div>
            </button>
            
            <button
              onClick={() => onAnswer(false)}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
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