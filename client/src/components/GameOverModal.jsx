import React from "react";

const GameOverModal = ({
  isOpen,
  winner,
  winnerId,
  isCorrect,
  guessedCharacter,
  correctCharacter,
  mySecretCharacter,
  opponentSecretCharacter,
  myEliminatedCharacters,
  opponentEliminatedCharacters,
  characters,
  players,
  onPlayAgain,
  onGoHome,
}) => {
  if (!isOpen) return null;

  // Get winner name from winnerId if winner is undefined
  const getWinnerName = () => {
    if (winner && winner !== "undefined" && winner !== null) {
      return winner;
    }
    
    // Try to find winner from players list using winnerId
    if (winnerId && players && players.length > 0) {
      const winnerPlayer = players.find(p => p.id === winnerId);
      if (winnerPlayer && winnerPlayer.username) {
        return winnerPlayer.username;
      }
    }
    
    // Fallback: use winnerId to create a player name
    if (winnerId) {
      return `Player ${winnerId.slice(-4)}`;
    }
    
    return "Unknown Player";
  };

  const displayWinner = getWinnerName();

  const myRemainingCount = characters.length - myEliminatedCharacters.length;
  const opponentRemainingCount =
    characters.length - opponentEliminatedCharacters.length;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {isCorrect ? "🎉 Congratulations!" : "😔 Game Over"}
          </h1>
          <h2 className="text-3xl font-semibold mb-4 text-gray-800">
            {displayWinner} Wins!
          </h2>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
            <p className="text-xl text-gray-700">
              {isCorrect
                ? `🎯 You correctly guessed ${correctCharacter?.name}!`
                : `💡 The correct answer was ${correctCharacter?.name}`}
            </p>
          </div>
        </div>

        {/* Secret Characters Display */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Secret Characters
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Winner's Character */}
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-3 text-green-600">
                Winner's Character
              </h4>
              <div className="bg-white rounded-lg p-4 shadow-lg">
                <img
                  src={
                    isCorrect
                      ? mySecretCharacter?.image
                      : opponentSecretCharacter?.image
                  }
                  alt={
                    isCorrect
                      ? mySecretCharacter?.name
                      : opponentSecretCharacter?.name
                  }
                  className="w-32 h-32 rounded-lg mx-auto mb-3 object-cover border-4 border-green-400"
                />
                <p className="text-lg font-semibold text-gray-800">
                  {isCorrect
                    ? mySecretCharacter?.name
                    : opponentSecretCharacter?.name}
                </p>
              </div>
            </div>

            {/* Loser's Character */}
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-3 text-red-600">
                Opponent's Character
              </h4>
              <div className="bg-white rounded-lg p-4 shadow-lg">
                <img
                  src={
                    isCorrect
                      ? opponentSecretCharacter?.image
                      : mySecretCharacter?.image
                  }
                  alt={
                    isCorrect
                      ? opponentSecretCharacter?.name
                      : mySecretCharacter?.name
                  }
                  className="w-32 h-32 rounded-lg mx-auto mb-3 object-cover border-4 border-red-400"
                />
                <p className="text-lg font-semibold text-gray-800">
                  {isCorrect
                    ? opponentSecretCharacter?.name
                    : mySecretCharacter?.name}
                </p>
              </div>
            </div>
          </div>
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
