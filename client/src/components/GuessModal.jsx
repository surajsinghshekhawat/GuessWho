import React from "react";

const GuessModal = ({ 
  isOpen, 
  onClose, 
  characters, 
  onGuess 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-blue-600 p-6 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ctext font-family='Arial' font-size='16' x='20' y='20' text-anchor='middle'%3E?%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat'
            }}></div>
          </div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white drop-shadow-lg">
                Make Your Guess
              </h2>
              <p className="text-white/90 mt-2">
                Choose who you think is your opponent's secret character
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
                onClick={() => onGuess(character.id)}
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
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="text-white text-sm font-bold">!</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-6 border-t">
          <div className="text-center">
            <p className="text-gray-600 text-sm mb-2">
              <span className="font-semibold text-red-600">Warning:</span> If you guess wrong, your turn will end!
            </p>
            <p className="text-gray-500 text-xs">
              Click on any character to make your guess
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuessModal;