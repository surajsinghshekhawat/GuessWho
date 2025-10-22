import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../store/GameStore";

const HomePage = () => {
  const navigate = useNavigate();
  const { connectSocket, createRoom, joinRoom, isConnected, error, roomCode } =
    useGame();
  const [username, setUsername] = useState("");
  const [inputRoomCode, setInputRoomCode] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  useEffect(() => {
    if (!isConnected) {
      connectSocket("Guest");
    }
  }, [isConnected, connectSocket]);

  useEffect(() => {
    if (roomCode && isConnected) {
      navigate(`/lobby/${roomCode}`);
    }
  }, [roomCode, isConnected, navigate]);

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setIsCreating(true);
    createRoom(username.trim());
  };

  const handleJoinRoom = async (e) => {
    e.preventDefault();
    if (!username.trim() || !inputRoomCode.trim()) return;

    setIsJoining(true);
    joinRoom(inputRoomCode.trim().toUpperCase(), username.trim());
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">GuessWho</h1>
          <p className="text-gray-600">
            The classic guessing game, now multiplayer!
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <form onSubmit={handleCreateRoom} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Your Name
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                required
              />
            </div>

            <button
              type="submit"
              disabled={!username.trim() || isCreating || !isConnected}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCreating ? "Creating Room..." : "Create New Room"}
            </button>
          </form>

          <div className="my-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleJoinRoom} className="space-y-4">
            <div>
              <label
                htmlFor="roomCode"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Room Code
              </label>
              <input
                type="text"
                id="roomCode"
                value={inputRoomCode}
                onChange={(e) => setInputRoomCode(e.target.value.toUpperCase())}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter room code"
                maxLength="5"
                required
              />
            </div>

            <button
              type="submit"
              disabled={
                !username.trim() ||
                !inputRoomCode.trim() ||
                isJoining ||
                !isConnected
              }
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isJoining ? "Joining Room..." : "Join Room"}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {!isConnected && (
            <div className="mt-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-lg">
              Connecting to server...
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>How to play:</p>
          <ul className="mt-2 space-y-1">
            <li>• Create a room and share the code</li>
            <li>• Choose a theme together</li>
            <li>• Select your secret character</li>
            <li>• Ask questions and eliminate characters</li>
            <li>• First to guess correctly wins!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
