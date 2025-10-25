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
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl w-full">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            {isCorrect ? "Congratulations!" : "Game Over"}
          </h1>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            {winnerName} Wins!
          </h2>
          <p className="text-lg text-gray-600">
            {isCorrect
              ? `You correctly guessed ${correctCharacter?.name}!`
              : `The correct answer was ${correctCharacter?.name}`}
          </p>
        </div>

        {/* Secret Characters Display */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-center mb-4 text-gray-700">Secret Characters</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Winner's Character */}
            <div className="text-center">
              <h4 className="text-sm font-medium mb-2 text-green-600">Winner</h4>
              <div className="bg-white rounded-lg p-3 border-2 border-green-400">
                <img
                  src={isCorrect ? mySecretCharacter?.image : opponentSecretCharacter?.image}
                  alt={isCorrect ? mySecretCharacter?.name : opponentSecretCharacter?.name}
                  className="w-20 h-20 rounded-lg mx-auto mb-2 object-cover"
                />
                <p className="text-sm font-medium text-gray-800">
                  {isCorrect ? mySecretCharacter?.name : opponentSecretCharacter?.name}
                </p>
              </div>
            </div>
            
            {/* Loser's Character */}
            <div className="text-center">
              <h4 className="text-sm font-medium mb-2 text-red-600">Opponent</h4>
              <div className="bg-white rounded-lg p-3 border-2 border-red-400">
                <img
                  src={isCorrect ? opponentSecretCharacter?.image : mySecretCharacter?.image}
                  alt={isCorrect ? opponentSecretCharacter?.name : mySecretCharacter?.name}
                  className="w-20 h-20 rounded-lg mx-auto mb-2 object-cover"
                />
                <p className="text-sm font-medium text-gray-800">
                  {isCorrect ? opponentSecretCharacter?.name : mySecretCharacter?.name}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Final Boards */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Your Final Board */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="text-sm font-semibold mb-3 text-blue-600">Your Board</h4>
            <div className="grid grid-cols-6 gap-1">
              {characters.map((character) => {
                const isEliminated = myEliminatedCharacters.includes(character.id);
                return (
                  <div
                    key={character.id}
                    className={`relative aspect-square rounded border transition-all duration-300 ${
                      isEliminated
                        ? "border-red-400 bg-red-100 opacity-60"
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
                      <div className="w-full h-full flex items-center justify-center bg-red-100 rounded">
                        <span className="text-red-500 text-sm font-bold">✕</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-gray-600 mt-2">
              Remaining: {myRemainingCount}
            </p>
          </div>

          {/* Opponent's Final Board */}
          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="text-sm font-semibold mb-3 text-purple-600">Opponent's Board</h4>
            <div className="grid grid-cols-6 gap-1">
              {characters.map((character) => {
                const isEliminated = opponentEliminatedCharacters.includes(character.id);
                return (
                  <div
                    key={character.id}
                    className={`relative aspect-square rounded border transition-all duration-300 ${
                      isEliminated
                        ? "border-red-400 bg-red-100 opacity-60"
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
                      <div className="w-full h-full flex items-center justify-center bg-red-100 rounded">
                        <span className="text-red-500 text-sm font-bold">✕</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-gray-600 mt-2">
              Remaining: {opponentRemainingCount}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={handlePlayAgain}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Play Again
          </button>
          <button
            onClick={handleGoHome}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinnerPage;