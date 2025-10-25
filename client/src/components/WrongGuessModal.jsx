import React from "react";

const WrongGuessModal = ({ 
  isOpen, 
  onClose, 
  guessedCharacter 
}) => {
  if (!isOpen) return null;

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
            <div className="text-6xl mb-4">😔</div>
            <h2 className="text-2xl font-bold text-white drop-shadow-lg mb-2">
              Wrong Guess!
            </h2>
            <p className="text-white/90">
              That's not the correct answer
            </p>
          </div>
        </div>

        {/* Guessed Character */}
        <div className="p-6">
          <div className="bg-gray-100 rounded-xl p-6 border-2 border-gray-300 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">You Guessed:</h3>
            
            <div className="bg-yellow-300 rounded-xl border-2 border-yellow-400 shadow-lg mx-auto max-w-32">
              {/* Character Image */}
              <div className="aspect-square p-3">
                <img
                  src={guessedCharacter?.image}
                  alt={guessedCharacter?.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              
              {/* Character Name */}
              <div className="p-2 bg-white rounded-b-lg">
                <h4 className="text-sm font-bold text-gray-800">
                  {guessedCharacter?.name}
                </h4>
              </div>
            </div>
            
            <p className="text-gray-600 mt-4">
              Your turn has ended. Better luck next time!
            </p>
          </div>
        </div>

        {/* Continue Button */}
        <div className="p-6 pt-0">
          <button
            onClick={onClose}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Continue Game
          </button>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 border-t">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Wait for your next turn to try again
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WrongGuessModal;