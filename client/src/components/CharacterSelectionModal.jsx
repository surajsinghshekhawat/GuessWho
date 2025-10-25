import React from "react";

const CharacterSelectionModal = ({ 
  isOpen, 
  onClose, 
  characters, 
  onSelectCharacter 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-red-500 p-6 relative overflow-hidden">
          {/* Background Pattern - Random Blue Question Marks */}
          <div className="absolute inset-0 opacity-30">
            {[...Array(20)].map((_, i) => (
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
          
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white drop-shadow-lg">
                Choose Your Secret Character
              </h2>
              <p className="text-white/90 mt-2">
                Pick one character that your opponent must guess
              </p>
            </div>
            <button
              onClick={onClose}
              className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Character Grid */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-6 gap-4">
            {characters.map((character) => (
              <div
                key={character.id}
                onClick={() => onSelectCharacter(character.id)}
                className="group cursor-pointer transition-all duration-300 hover:scale-105"
              >
                {/* Character Card */}
                <div className="bg-yellow-300 rounded-xl border-2 border-yellow-400 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:border-yellow-500">
                  {/* Character Image */}
                  <div className="aspect-square p-3">
                    <img
                      src={character.image}
                      alt={character.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  
                  {/* Character Name */}
                  <div className="p-2 bg-white rounded-b-lg">
                    <h3 className="text-sm font-bold text-gray-800 text-center">
                      {character.name}
                    </h3>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
                
                {/* Selection Indicator */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-6 border-t">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Click on any character to select them as your secret character
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterSelectionModal;