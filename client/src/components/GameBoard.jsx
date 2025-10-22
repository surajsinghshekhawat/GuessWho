import React, { useState } from "react";

const GameBoard = ({
  characters,
  eliminatedCharacters,
  onCharacterClick,
  isMyTurn,
  currentTurn,
}) => {
  const [clickedCard, setClickedCard] = useState(null);

  const handleCharacterClick = (characterId) => {
    if (!isMyTurn) return;

    setClickedCard(characterId);
    onCharacterClick(characterId);

    // Reset animation after delay
    setTimeout(() => {
      setClickedCard(null);
    }, 300);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Character Board</h2>
        <p className="text-sm text-gray-600">
          {isMyTurn
            ? "Your turn - Click to eliminate characters"
            : "Waiting for opponent..."}
        </p>
        <div className="mt-2 text-center text-sm text-gray-600">
          Remaining: {characters.length - eliminatedCharacters.length} /{" "}
          {characters.length}
        </div>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
        {characters.map((character) => {
          const isEliminated = eliminatedCharacters.includes(character.id);
          const isClickable = isMyTurn && !isEliminated;
          const isClicked = clickedCard === character.id;

          return (
            <div
              key={character.id}
              className={`relative transition-all duration-300 ${
                isClickable
                  ? "cursor-pointer hover:scale-105"
                  : "cursor-not-allowed"
              }`}
              onClick={() => handleCharacterClick(character.id)}
            >
              <div
                className={`relative w-full h-32 rounded-lg overflow-hidden border-2 transition-all duration-500 ${
                  isEliminated
                    ? "border-red-400 bg-red-100 opacity-60 transform rotate-y-180"
                    : isClickable
                    ? "border-blue-300 bg-blue-50 hover:border-blue-500 hover:shadow-lg"
                    : "border-gray-200 bg-gray-50"
                } ${isClicked ? "scale-95 shadow-lg" : ""}`}
                style={{
                  transformStyle: "preserve-3d",
                  transform: isEliminated ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Front of card */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isEliminated ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white text-xs p-2 text-center">
                    <div className="font-medium">{character.name}</div>
                  </div>
                </div>

                {/* Back of card (eliminated) */}
                <div
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    isEliminated ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ transform: "rotateY(180deg)" }}
                >
                  <div className="flex items-center justify-center h-full bg-red-100">
                    <div className="text-center">
                      <div className="text-3xl mb-2 text-red-500">❌</div>
                      <div className="text-xs font-medium text-red-600">
                        Eliminated
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover effect overlay */}
                {isClickable && !isEliminated && (
                  <div className="absolute inset-0 bg-blue-500 bg-opacity-0 hover:bg-opacity-10 transition-all duration-200 rounded-lg"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
            style={{
              width: `${
                ((characters.length - eliminatedCharacters.length) /
                  characters.length) *
                100
              }%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
