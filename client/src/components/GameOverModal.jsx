import React from "react";

const GameOverModal = ({
  isOpen,
  winner,
  isCorrect,
  guessedCharacter,
  correctCharacter,
  mySecretCharacter,
  opponentSecretCharacter,
  myEliminatedCharacters,
  opponentEliminatedCharacters,
  characters,
  onPlayAgain,
  onGoHome,
}) => {
  if (!isOpen) return null;

  const myRemainingCount = characters.length - myEliminatedCharacters.length;
  const opponentRemainingCount =
    characters.length - opponentEliminatedCharacters.length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            {isCorrect ? "🎉 Congratulations!" : "😔 Game Over"}
          </h1>
          <h2 className="text-2xl font-semibold mb-2">{winner} Wins!</h2>
          <p className="text-lg text-gray-600">
            {isCorrect
              ? `You correctly guessed ${correctCharacter?.name}!`
              : `The correct answer was ${correctCharacter?.name}`}
          </p>
        </div>

        {/* Game Results */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Your Board */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-blue-800">
              Your Board
            </h3>
            <div className="text-center mb-4">
              <div className="text-sm text-gray-600 mb-2">
                Your Secret Character
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <img
                  src={mySecretCharacter?.image}
                  alt={mySecretCharacter?.name}
                  className="w-20 h-20 rounded-lg mx-auto mb-2 object-cover"
                />
                <p className="font-medium">{mySecretCharacter?.name}</p>
              </div>
            </div>
            <div className="text-center mb-4">
              <div className="text-sm text-gray-600 mb-2">Final Board</div>
              <div className="grid grid-cols-6 gap-1">
                {characters.map((character) => {
                  const isEliminated = myEliminatedCharacters.includes(
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
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-red-500 text-xs">✕</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {myRemainingCount} characters remaining
              </p>
            </div>
          </div>

          {/* Opponent's Board */}
          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-green-800">
              Opponent's Board
            </h3>
            <div className="text-center mb-4">
              <div className="text-sm text-gray-600 mb-2">
                Opponent's Secret Character
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <img
                  src={opponentSecretCharacter?.image}
                  alt={opponentSecretCharacter?.name}
                  className="w-20 h-20 rounded-lg mx-auto mb-2 object-cover"
                />
                <p className="font-medium">{opponentSecretCharacter?.name}</p>
              </div>
            </div>
            <div className="text-center mb-4">
              <div className="text-sm text-gray-600 mb-2">Final Board</div>
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
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-red-500 text-xs">✕</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {opponentRemainingCount} characters remaining
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={onPlayAgain}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Play Again
          </button>
          <button
            onClick={onGoHome}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
