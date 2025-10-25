import React from "react";

const GameBoard = ({ characters, eliminatedCharacters, onCharacterClick, isMyTurn }) => {
  return (
    <div className="bg-red-500 rounded-2xl shadow-2xl p-6 relative overflow-hidden">
      {/* Background Pattern - Random Blue Question Marks */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(30)].map((_, i) => (
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

      {/* Board Header */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white drop-shadow-lg">
            Your Board
          </h2>
          <div className="bg-white/20 rounded-full px-4 py-2">
            <span className="text-white font-semibold">
              {characters.length - eliminatedCharacters.length} Remaining
            </span>
          </div>
        </div>
      </div>

      {/* Character Grid */}
      <div className="relative z-10">
        <div className="grid grid-cols-6 gap-3">
          {characters.map((character) => {
            const isEliminated = eliminatedCharacters.includes(character.id);
            return (
              <div
                key={character.id}
                className={`relative group cursor-pointer transition-all duration-300 ${
                  isMyTurn ? 'hover:scale-105' : 'cursor-not-allowed'
                }`}
                onClick={() => {
                  if (isMyTurn) {
                    onCharacterClick(character.id);
                  }
                }}
              >
                {/* Character Card */}
                <div className={`relative aspect-square rounded-lg border-2 transition-all duration-300 ${
                  isEliminated
                    ? 'bg-gray-400 border-gray-500 opacity-60'
                    : 'bg-yellow-300 border-yellow-400 hover:border-yellow-500 shadow-lg'
                } ${isMyTurn && !isEliminated ? 'hover:shadow-xl' : ''}`}>
                  
                  {/* Character Image */}
                  {!isEliminated ? (
                    <div className="w-full h-full p-2">
                      <img
                        src={character.image}
                        alt={character.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-gray-600 text-4xl font-bold">✕</div>
                    </div>
                  )}

                  {/* Character Name */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white rounded-b-lg p-1">
                    <p className="text-xs font-bold text-gray-800 text-center truncate">
                      {character.name}
                    </p>
                  </div>

                  {/* Hover Effect */}
                  {isMyTurn && !isEliminated && (
                    <div className="absolute inset-0 bg-white/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                  )}
                </div>

                {/* Click Indicator */}
                {isMyTurn && !isEliminated && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Board Footer */}
      <div className="relative z-10 mt-8 pt-4 border-t border-white/20">
        <div className="flex items-center justify-center space-x-4 text-white/90">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-yellow-300 rounded border border-yellow-400"></div>
            <span className="text-sm">Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-400 rounded border border-gray-500"></div>
            <span className="text-sm">Eliminated</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;