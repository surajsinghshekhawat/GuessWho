import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGame } from "../store/GameStore";
import { themes } from "../data/characters";

const LobbyPage = () => {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const {
    connectSocket,
    isConnected,
    players,
    isHost,
    selectTheme,
    gameState,
    resetGame,
    disconnectSocket,
  } = useGame();

  useEffect(() => {
    if (!isConnected) {
      connectSocket("Guest");
    }
  }, [isConnected, connectSocket]);

  useEffect(() => {
    console.log(
      "LobbyPage useEffect - gameState:",
      gameState,
      "roomCode:",
      roomCode
    );
    if (gameState === "character-selection") {
      console.log("Navigating to game page:", `/game/${roomCode}`);
      navigate(`/game/${roomCode}`);
    }
  }, [gameState, roomCode, navigate]);

  const handleStartGame = (themeId) => {
    if (themeId) {
      selectTheme(themeId);
    }
  };

  const handleBackToHome = () => {
    console.log("Back button clicked");
    disconnectSocket();
    resetGame();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-blue-600 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-red-500 to-blue-600 rounded-full p-3">
                <span className="text-white text-xl font-bold">?</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Guess Who</h1>
                <p className="text-gray-600">Room: {roomCode}</p>
              </div>
            </div>

            <button
              onClick={handleBackToHome}
              className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200"
            >
              Back to Home
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Players List */}
          <div className="bg-white rounded-2xl shadow-2xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Players in Room
            </h2>
            <div className="space-y-3">
              {players.map((player) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-lg border-2 border-yellow-300"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {player.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="font-medium text-gray-800">
                      {player.username}
                    </span>
                  </div>
                  {player.isHost && (
                    <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
                      Host
                    </span>
                  )}
                </div>
              ))}
            </div>

            {players.length < 2 && (
              <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
                Waiting for players to join... (Need 2 players to start)
              </div>
            )}
          </div>

          {/* Theme Selection */}
          <div className="bg-white rounded-2xl shadow-2xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Choose Theme
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleStartGame(theme.id)}
                  disabled={players.length < 2 || !isHost}
                  className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    players.length < 2 || !isHost
                      ? "border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
                      : "border-gray-200 hover:border-red-300 hover:bg-red-50 shadow-lg hover:shadow-xl transform hover:scale-105"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg font-bold">?</span>
                    </div>
                    <div>
                      <div className="font-medium text-lg text-gray-800">
                        {theme.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {theme.description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {players.length < 2 && (
              <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                <p className="text-sm font-medium">
                  Need 2 players to start the game
                </p>
              </div>
            )}

            {!isHost && (
              <div className="mt-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded-lg">
                <p className="text-sm font-medium">
                  Only the host can select the theme
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Game Rules */}
        <div className="mt-6 bg-white rounded-2xl shadow-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            How to Play
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Game Rules:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Each player secretly picks one character</li>
                <li>• Take turns asking yes/no questions</li>
                <li>• Eliminate characters based on answers</li>
                <li>• First to guess correctly wins!</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">
                Question Examples:
              </h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• "Does your person wear glasses?"</li>
                <li>• "Is your person a man?"</li>
                <li>• "Does your person have blonde hair?"</li>
                <li>• "Is your person wearing a hat?"</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LobbyPage;
