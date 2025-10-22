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
  } = useGame();

  useEffect(() => {
    if (!isConnected) {
      connectSocket("Guest");
    }
  }, [isConnected, connectSocket]);

  useEffect(() => {
    // Navigate to game page when theme is selected (for all players)
    console.log("LobbyPage useEffect - gameState:", gameState, "roomCode:", roomCode);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">
            Room: {roomCode}
          </h1>
          <p className="text-gray-600">
            Waiting for players and theme selection
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Players Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              Players ({players.length}/2)
            </h2>
            <div className="space-y-3">
              {players.map((player) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <span className="font-medium">{player.username}</span>
                  {player.isHost && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Host
                    </span>
                  )}
                </div>
              ))}
            </div>

            {players.length < 1 && (
              <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
                Waiting for players to join...
              </div>
            )}
          </div>

          {/* Theme Selection */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Choose Theme</h2>
            <div className="grid grid-cols-2 gap-3">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => handleStartGame(theme.id)}
                  disabled={players.length < 1 || !isHost}
                  className={`p-3 rounded-lg border-2 text-left transition-colors ${
                    players.length < 1 || !isHost
                      ? "border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
                      : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                >
                  <div className="font-medium text-sm">{theme.name}</div>
                  <div className="text-xs text-gray-500">
                    {theme.description}
                  </div>
                </button>
              ))}
            </div>

            {players.length < 1 && (
              <div className="mt-4 p-3 bg-blue-100 border border-blue-400 text-blue-700 rounded-lg">
                Need at least 1 player to start the game
              </div>
            )}

            {!isHost && players.length >= 1 && (
              <div className="mt-4 p-3 bg-gray-100 border border-gray-400 text-gray-700 rounded-lg">
                Waiting for host to select theme...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LobbyPage;
