import React, { useState } from "react";

const GuessModal = ({ characters, onGuess, isOpen, onClose }) => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleConfirm = () => {
    if (selectedCharacter) {
      onGuess(selectedCharacter);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Make Your Guess
          </h2>
          <p className="text-gray-600">
            Select the character you think your opponent has chosen
          </p>
        </div>

        <div className="grid grid-cols-4 md:grid-cols-6 gap-4 mb-6">
          {characters.map((character) => (
            <div
              key={character.id}
              className={`relative cursor-pointer transition-all duration-200 ${
                selectedCharacter === character.id
                  ? "ring-4 ring-red-500 ring-opacity-50 scale-105"
                  : "hover:scale-105"
              }`}
              onClick={() => setSelectedCharacter(character.id)}
            >
              <div className="w-full h-32 rounded-lg overflow-hidden border-2 border-gray-200">
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white text-xs p-1 text-center">
                  {character.name}
                </div>
              </div>
              {selectedCharacter === character.id && (
                <div className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                  ✓
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={!selectedCharacter}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Make Guess
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuessModal;
