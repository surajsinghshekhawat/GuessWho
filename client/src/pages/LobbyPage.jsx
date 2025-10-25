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
    <div className="min-h-screen bg-red-500 relative overflow-hidden p-4">
      {/* Background Pattern - Random Blue Question Marks */}
      <div className="absolute inset-0 opacity-50">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute text-blue-500 text-2xl font-bold"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              fontSize: `${Math.random() * 20 + 16}px`,
            }}
          >
            ?
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                  Guess Who
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">
                  Room: {roomCode}
                </p>
              </div>
            </div>

            <button
              onClick={handleBackToHome}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200"
            >
              Home
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Players List */}
          <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
              Players in Room
            </h2>
            <div className="space-y-3">
              {players.map((player, index) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-3 bg-yellow-100 rounded-lg border-2 border-yellow-300"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index === 0 ? "bg-red-500" : "bg-blue-500"
                      }`}
                    >
                      <span className="text-white text-sm font-bold">
                        {player.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="font-medium text-gray-800 text-sm sm:text-base">
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
              <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg text-sm">
                Waiting for players to join... (Need 2 players to start)
              </div>
            )}
          </div>

          {/* Theme Selection - Wider Card */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-2xl p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
              Choose Theme
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleStartGame(theme.id)}
                  disabled={players.length < 2 || !isHost}
                  className={`p-3 sm:p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                    players.length < 2 || !isHost
                      ? "border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
                      : "border-gray-200 hover:border-red-300 hover:bg-red-50 shadow-lg hover:shadow-xl transform hover:scale-105"
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2 text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg font-bold">?</span>
                    </div>
                    <div>
                      <div className="font-medium text-sm sm:text-base text-gray-800">
                        {theme.name}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 hidden sm:block">
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
        <div className="mt-6 bg-white rounded-2xl shadow-2xl p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
            How to Play
          </h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">
                Game Rules:
              </h3>
              <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
                <li>• Each player secretly picks one character</li>
                <li>• Take turns asking yes/no questions</li>
                <li>• Eliminate characters based on answers</li>
                <li>• First to guess correctly wins!</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-700 mb-2 text-sm sm:text-base">
                Question Examples:
              </h3>
              <ul className="text-xs sm:text-sm text-gray-600 space-y-1">
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
