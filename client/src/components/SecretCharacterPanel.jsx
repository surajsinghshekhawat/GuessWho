import React from "react";

const SecretCharacterPanel = ({
  mySecretCharacter,
  opponentSecretCharacter,
  opponentEliminatedCharacters,
  characters,
  onGuessCharacter,
  isMyTurn,
}) => {
  const opponentRemainingCount =
    characters.length - opponentEliminatedCharacters.length;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Game Status</h2>

      {/* My Secret Character */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 text-blue-600">
          Your Character
        </h3>
        {mySecretCharacter ? (
          <div className="text-center">
            <div className="w-24 h-24 mx-auto rounded-lg overflow-hidden border-2 border-blue-300 mb-2">
              <img
                src={mySecretCharacter.image}
                alt={mySecretCharacter.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm font-medium">{mySecretCharacter.name}</p>
            <p className="text-xs text-gray-500">Opponent is guessing this</p>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <div className="w-24 h-24 mx-auto rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center mb-2">
              <span className="text-gray-400">?</span>
            </div>
            <p className="text-sm">Select your character</p>
          </div>
        )}
      </div>

      {/* Opponent's Progress */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3 text-green-600">
          Opponent's Board
        </h3>
        <div className="text-center mb-3">
          <div className="text-lg font-bold text-green-600">
            {opponentRemainingCount} remaining
          </div>
        </div>

        {/* Miniature opponent grid */}
        <div className="grid grid-cols-6 gap-1">
          {characters.map((character) => {
            const isEliminated = opponentEliminatedCharacters.includes(
              character.id
            );
            return (
              <div
                key={character.id}
                className={`relative w-full h-12 rounded border transition-all duration-300 ${
                  isEliminated
                    ? "border-red-300 bg-red-100 opacity-50"
                    : "border-gray-300 bg-gray-50"
                }`}
              >
                {!isEliminated ? (
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-full h-full object-cover rounded"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-red-500">
                    <span className="text-xs">❌</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Guess Button */}
      {isMyTurn && (
        <div className="text-center">
          <button
            onClick={onGuessCharacter}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
          >
            Make a Guess
          </button>
          <p className="text-xs text-gray-500 mt-2">
            Click when you think you know the answer
          </p>
        </div>
      )}
    </div>
  );
};

export default SecretCharacterPanel;
