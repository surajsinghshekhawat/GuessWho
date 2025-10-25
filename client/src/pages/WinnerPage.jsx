import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGame } from "../store/GameStore";

const WinnerPage = () => {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const {
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
    playAgain,
    resetGame,
  } = useGame();

  // Get winner name with robust fallback
  const getWinnerName = () => {
    console.log("WinnerPage - winner:", winner, "winnerId:", winnerId, "players:", players);
    
    // Check for various forms of undefined/null/empty
    if (winner && winner !== "undefined" && winner !== null && winner !== "" && winner !== "null") {
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

  const winnerName = getWinnerName();
  console.log("WinnerPage - final winnerName:", winnerName);

  const handlePlayAgain = () => {
    playAgain();
    navigate(`/lobby/${roomCode}`);
  };

  const handleGoHome = () => {
    resetGame();
    navigate("/");
  };

  const myRemainingCount = characters.length - myEliminatedCharacters.length;
  const opponentRemainingCount = characters.length - opponentEliminatedCharacters.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {isCorrect ? "🎉 Congratulations!" : "😔 Game Over"}
          </h1>
          <h2 className="text-4xl font-semibold mb-6 text-gray-800">
            {winnerName} Wins!
          </h2>
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
            <p className="text-2xl text-gray-700">
              {isCorrect
                ? `🎯 You correctly guessed ${correctCharacter?.name}!`
                : `💡 The correct answer was ${correctCharacter?.name}`}
            </p>
          </div>
        </div>

        {/* Secret Characters Display */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-8">
          <h3 className="text-3xl font-bold text-center mb-8 text-gray-800">Secret Characters</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Winner's Character */}
            <div className="text-center">
              <h4 className="text-xl font-semibold mb-4 text-green-600">Winner's Character</h4>
              <div className="bg-white rounded-xl p-6 shadow-lg border-4 border-green-400">
                <img
                  src={isCorrect ? mySecretCharacter?.image : opponentSecretCharacter?.image}
                  alt={isCorrect ? mySecretCharacter?.name : opponentSecretCharacter?.name}
                  className="w-40 h-40 rounded-xl mx-auto mb-4 object-cover"
                />
                <p className="text-xl font-semibold text-gray-800">
                  {isCorrect ? mySecretCharacter?.name : opponentSecretCharacter?.name}
                </p>
              </div>
            </div>
            
            {/* Loser's Character */}
            <div className="text-center">
              <h4 className="text-xl font-semibold mb-4 text-red-600">Opponent's Character</h4>
              <div className="bg-white rounded-xl p-6 shadow-lg border-4 border-red-400">
                <img
                  src={isCorrect ? opponentSecretCharacter?.image : mySecretCharacter?.image}
                  alt={isCorrect ? opponentSecretCharacter?.name : mySecretCharacter?.name}
                  className="w-40 h-40 rounded-xl mx-auto mb-4 object-cover"
                />
                <p className="text-xl font-semibold text-gray-800">
                  {isCorrect ? opponentSecretCharacter?.name : mySecretCharacter?.name}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Final Boards */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Your Final Board */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h4 className="text-xl font-semibold mb-4 text-blue-600">Your Final Board</h4>
            <div className="grid grid-cols-6 gap-2">
              {characters.map((character) => {
                const isEliminated = myEliminatedCharacters.includes(character.id);
                return (
                  <div
                    key={character.id}
                    className={`relative aspect-square rounded-lg border-2 transition-all duration-300 ${
                      isEliminated
                        ? "border-red-400 bg-red-100 opacity-60"
                        : "border-gray-300 bg-gray-50 hover:shadow-md"
                    }`}
                  >
                    {!isEliminated ? (
                      <img
                        src={character.image}
                        alt={character.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-red-100 rounded-lg">
                        <span className="text-red-500 text-xl font-bold">✕</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Remaining: {myRemainingCount} characters
            </p>
          </div>

          {/* Opponent's Final Board */}
          <div className="bg-purple-50 rounded-xl p-6">
            <h4 className="text-xl font-semibold mb-4 text-purple-600">Opponent's Final Board</h4>
            <div className="grid grid-cols-6 gap-2">
              {characters.map((character) => {
                const isEliminated = opponentEliminatedCharacters.includes(character.id);
                return (
                  <div
                    key={character.id}
                    className={`relative aspect-square rounded-lg border-2 transition-all duration-300 ${
                      isEliminated
                        ? "border-red-400 bg-red-100 opacity-60"
                        : "border-gray-300 bg-gray-50 hover:shadow-md"
                    }`}
                  >
                    {!isEliminated ? (
                      <img
                        src={character.image}
                        alt={character.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-red-100 rounded-lg">
                        <span className="text-red-500 text-xl font-bold">✕</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Remaining: {opponentRemainingCount} characters
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={handlePlayAgain}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            🎮 Play Again
          </button>
          <button
            onClick={handleGoHome}
            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-8 py-4 rounded-xl text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            🏠 Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinnerPage;
