import React from "react";

const WrongGuessModal = ({
  isOpen,
  guessedCharacter,
  correctCharacter,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md mx-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Wrong Guess! 😔
        </h2>
        
        <div className="mb-4">
          <p className="text-gray-600 mb-2 text-center">
            You guessed: <strong>{guessedCharacter?.name}</strong>
          </p>
          <p className="text-gray-600 text-center">
            The correct answer was: <strong>{correctCharacter?.name}</strong>
          </p>
        </div>

        <div className="flex gap-4 mb-4">
          <div className="flex-1 text-center">
            <div className="text-sm text-gray-600 mb-2">Your Guess</div>
            <div className="bg-red-50 rounded-lg p-3">
              <img
                src={guessedCharacter?.image}
                alt={guessedCharacter?.name}
                className="w-16 h-16 rounded-lg mx-auto mb-2 object-cover"
              />
              <p className="text-sm font-medium">{guessedCharacter?.name}</p>
            </div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-sm text-gray-600 mb-2">Correct Answer</div>
            <div className="bg-green-50 rounded-lg p-3">
              <img
                src={correctCharacter?.image}
                alt={correctCharacter?.name}
                className="w-16 h-16 rounded-lg mx-auto mb-2 object-cover"
              />
              <p className="text-sm font-medium">{correctCharacter?.name}</p>
            </div>
          </div>
        </div>

        <p className="text-gray-600 mb-4 text-center">
          Your turn is over. The game continues with your opponent.
        </p>

        <button
          onClick={onClose}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default WrongGuessModal;
