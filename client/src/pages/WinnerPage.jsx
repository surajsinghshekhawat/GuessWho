import React, { useEffect } from "react";
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
    socket,
  } = useGame();

  console.log("WinnerPage - All props received:", {
    winner,
    winnerId,
    isCorrect,
    players,
    roomCode
  });

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
    // Reset game state on server and navigate to lobby
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
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-5xl w-full">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">
            {isCorrect ? "🎉" : "😔"}
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
            {isCorrect ? "Congratulations!" : "Game Over"}
          </h1>
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            {winnerName} Wins!
          </h2>
          <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-xl p-6 mb-8 border-2 border-yellow-300">
            <p className="text-xl text-gray-700">
              {isCorrect
                ? `You correctly guessed ${correctCharacter?.name}!`
                : `The correct answer was ${correctCharacter?.name}`}
            </p>
          </div>
        </div>

        {/* Secret Characters Display */}
        <div className="bg-gradient-to-r from-red-50 to-blue-50 rounded-2xl p-8 mb-8 border-2 border-gray-200">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">Secret Characters</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Winner's Character */}
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-4 text-green-600">Winner's Character</h4>
              <div className="bg-white rounded-xl p-6 shadow-lg border-4 border-green-400">
                <div className="w-32 h-32 mx-auto mb-4 bg-yellow-300 rounded-xl border-2 border-yellow-400 overflow-hidden">
                  <img
                    src={isCorrect ? mySecretCharacter?.image : opponentSecretCharacter?.image}
                    alt={isCorrect ? mySecretCharacter?.name : opponentSecretCharacter?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xl font-semibold text-gray-800">
                  {isCorrect ? mySecretCharacter?.name : opponentSecretCharacter?.name}
                </h4>
              </div>
            </div>
            
            {/* Loser's Character */}
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-4 text-red-600">Opponent's Character</h4>
              <div className="bg-white rounded-xl p-6 shadow-lg border-4 border-red-400">
                <div className="w-32 h-32 mx-auto mb-4 bg-yellow-300 rounded-xl border-2 border-yellow-400 overflow-hidden">
                  <img
                    src={isCorrect ? opponentSecretCharacter?.image : mySecretCharacter?.image}
                    alt={isCorrect ? opponentSecretCharacter?.name : mySecretCharacter?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xl font-semibold text-gray-800">
                  {isCorrect ? opponentSecretCharacter?.name : mySecretCharacter?.name}
                </h4>
              </div>
            </div>
          </div>
        </div>

        {/* Final Boards */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Your Final Board */}
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6">
            <h4 className="text-lg font-semibold mb-4 text-white">Your Final Board</h4>
            <div className="grid grid-cols-6 gap-2">
              {characters.map((character) => {
                const isEliminated = myEliminatedCharacters.includes(character.id);
                return (
                  <div
                    key={character.id}
                    className={`relative aspect-square rounded-lg border-2 transition-all duration-300 ${
                      isEliminated
                        ? "border-gray-400 bg-gray-300 opacity-60"
                        : "border-yellow-400 bg-yellow-300"
                    }`}
                  >
                    {!isEliminated ? (
                      <img
                        src={character.image}
                        alt={character.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-300 rounded-lg">
                        <span className="text-gray-600 text-lg font-bold">✕</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <p className="text-white text-sm mt-2">
              Remaining: {myRemainingCount} characters
            </p>
          </div>

          {/* Opponent's Final Board */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6">
            <h4 className="text-lg font-semibold mb-4 text-white">Opponent's Final Board</h4>
            <div className="grid grid-cols-6 gap-2">
              {characters.map((character) => {
                const isEliminated = opponentEliminatedCharacters.includes(character.id);
                return (
                  <div
                    key={character.id}
                    className={`relative aspect-square rounded-lg border-2 transition-all duration-300 ${
                      isEliminated
                        ? "border-gray-400 bg-gray-300 opacity-60"
                        : "border-yellow-400 bg-yellow-300"
                    }`}
                  >
                    {!isEliminated ? (
                      <img
                        src={character.image}
                        alt={character.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-300 rounded-lg">
                        <span className="text-gray-600 text-lg font-bold">✕</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <p className="text-white text-sm mt-2">
              Remaining: {opponentRemainingCount} characters
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={handlePlayAgain}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-xl text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Play Again
          </button>
          <button
            onClick={handleGoHome}
            className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-8 py-4 rounded-xl text-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinnerPage;