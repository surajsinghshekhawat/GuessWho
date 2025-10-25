import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../store/GameStore";

const HomePage = () => {
  const navigate = useNavigate();
  const { createRoom, joinRoom, roomCode, connectSocket, isConnected } =
    useGame();
  const [username, setUsername] = useState("");
  const [inputRoomCode, setInputRoomCode] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  // Connect socket on component mount
  useEffect(() => {
    console.log("=== SOCKET CONNECTION DEBUG ===");
    console.log("isConnected:", isConnected);
    if (!isConnected) {
      console.log("Connecting socket...");
      connectSocket("Guest");
    } else {
      console.log("Socket already connected");
    }
  }, [isConnected, connectSocket]);

  const handleCreateRoom = async () => {
    console.log("=== CREATE ROOM BUTTON CLICKED ===");
    console.log("Username:", username);
    console.log("Username trimmed:", username.trim());
    console.log("Is creating:", isCreating);
    
    if (!username.trim()) {
      console.log("No username provided, returning");
      return;
    }
    
    console.log("Creating room with username:", username);
    setIsCreating(true);
    
    try {
      console.log("About to call createRoom function");
      
      // Wait for socket to connect if not already connected
      if (!isConnected) {
        console.log("Socket not connected, waiting for connection...");
        // Try to reconnect
        connectSocket("Guest");
        // Wait a bit for connection
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      await createRoom(username);
      console.log("Create room called successfully");
    } catch (error) {
      console.error("Error creating room:", error);
    }
    
    setIsCreating(false);
    console.log("Create room process completed");
  };

  const handleJoinRoom = async () => {
    if (!username.trim() || !inputRoomCode.trim()) return;
    setIsJoining(true);
    await joinRoom(inputRoomCode, username);
    setIsJoining(false);
  };

  // Navigate to lobby when room is created or joined
  useEffect(() => {
    console.log("=== ROOM CODE DEBUG ===");
    console.log("roomCode:", roomCode);
    if (roomCode) {
      console.log(
        "Room code exists, navigating to lobby:",
        `/lobby/${roomCode}`
      );
      navigate(`/lobby/${roomCode}`);
    }
  }, [roomCode, navigate]);

  return (
    <div className="min-h-screen bg-red-500 relative overflow-hidden">
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
              fontSize: `${20 + Math.random() * 20}px`,
            }}
          >
            ?
          </div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Header - No Logo */}
        <div className="text-center mb-12">
          <h1 className="text-8xl font-bold text-white mb-4 drop-shadow-2xl tracking-wider">
            GUESS WHO
          </h1>
          <p className="text-2xl text-white/90 font-medium">
            The Classic Mystery Game • Now Multiplayer!
          </p>
        </div>

        {/* Main Content - Adjusted Card Widths */}
        <div className="w-full max-w-7xl grid grid-cols-3 gap-8 mb-12">
          {/* How to Play Card - Takes 2 columns */}
          <div className="col-span-2 bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              How to Play
            </h2>

            <div className="grid grid-cols-2 gap-8">
              {/* Left Column - Game Boards and Rules */}
              <div className="space-y-6">
                {/* Game Boards Preview */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-700">
                    Game Boards
                  </h3>
                  <div className="flex gap-4 justify-center">
                    {/* Red Board Preview */}
                    <div className="bg-red-500 rounded-lg p-4 shadow-lg">
                      <div className="text-white text-sm font-bold mb-2">
                        Player 1
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 bg-yellow-300 rounded border border-gray-300"
                          ></div>
                        ))}
                      </div>
                    </div>

                    {/* Blue Board Preview */}
                    <div className="bg-blue-500 rounded-lg p-4 shadow-lg">
                      <div className="text-white text-sm font-bold mb-2">
                        Player 2
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 bg-yellow-300 rounded border border-gray-300"
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Game Rules */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-700">Rules</h3>
                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">1</span>
                      </div>
                      <p>Each player secretly picks one character</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">2</span>
                      </div>
                      <p>Take turns asking yes/no questions</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">3</span>
                      </div>
                      <p>Eliminate characters based on answers</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">4</span>
                      </div>
                      <p>First to guess correctly wins!</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Gameplay Details */}
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Gameplay Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-600 mb-2">
                        Question Examples:
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• "Does your person wear glasses?"</li>
                        <li>• "Is your person a man?"</li>
                        <li>• "Does your person have blonde hair?"</li>
                        <li>• "Is your person wearing a hat?"</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-600 mb-2">
                        Strategy Tips:
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Ask broad questions first</li>
                        <li>• Eliminate half the board each turn</li>
                        <li>• Pay attention to opponent's questions</li>
                        <li>• Don't guess too early!</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Start Playing Card - Takes 1 column */}
          <div className="col-span-1 bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Start Playing
            </h2>

            {/* Username Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={20}
              />
            </div>

            {/* Create Room */}
            <div className="mb-6">
              <button
                onClick={() => {
                  console.log("BUTTON CLICKED - TEST");
                  handleCreateRoom();
                }}
                disabled={!username.trim() || isCreating}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed shadow-lg"
              >
                {isCreating ? "Creating..." : "Create New Room"}
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center mb-6">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-gray-500 font-medium">OR</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Join Room */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Room Code
                </label>
                <input
                  type="text"
                  value={inputRoomCode}
                  onChange={(e) =>
                    setInputRoomCode(e.target.value.toUpperCase())
                  }
                  placeholder="Enter room code"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center font-mono text-lg tracking-wider"
                  maxLength={5}
                />
              </div>
              <button
                onClick={handleJoinRoom}
                disabled={
                  !username.trim() || !inputRoomCode.trim() || isJoining
                }
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed shadow-lg"
              >
                {isJoining ? "Joining..." : "Join Room"}
              </button>
            </div>

            {/* Room Code Display */}
            {roomCode && (
              <div className="mt-6 p-4 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-lg border-2 border-yellow-300">
                <p className="text-sm text-gray-700 mb-2">Room Created!</p>
                <p className="text-2xl font-bold text-gray-800 font-mono tracking-wider">
                  {roomCode}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Share this code with your friend
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-white/80 text-lg">
            Challenge your friends to the ultimate guessing game!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
