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
              Question Answered
            </h2>
            <p className="text-white/90">
              Your opponent has answered your question
            </p>
          </div>
        </div>

        {/* Question and Answer */}
        <div className="p-6">
          <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-xl p-6 border-2 border-yellow-300 mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Question:</h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              "{question}"
            </p>
          </div>

          <div className={`bg-gradient-to-r ${answerColor} rounded-xl p-6 text-center`}>
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
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
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