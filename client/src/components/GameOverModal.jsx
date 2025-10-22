import React from "react";

const GameOverModal = ({ winner, players, onPlayAgain }) => {
  const winnerPlayer = players.find((p) => p.id === winner);
  const isWinner =
    winnerPlayer &&
    winnerPlayer.socketId === players.find((p) => p.socketId).socketId;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 text-center">
        <div className="text-6xl mb-4">{isWinner ? "🎉" : "😔"}</div>

        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {isWinner ? "Congratulations!" : "Game Over"}
        </h2>

        <p className="text-lg text-gray-600 mb-6">
          {isWinner
            ? `You won! You correctly guessed ${winnerPlayer?.username}'s character!`
            : `${winnerPlayer?.username} won! Better luck next time!`}
        </p>

        <div className="space-y-3">
          <button
            onClick={onPlayAgain}
            className="w-full btn-primary text-lg py-3"
          >
            Play Again
          </button>

          <button
            onClick={() => (window.location.href = "/")}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Back to Home
          </button>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            Thanks for playing GuessWho! 🎮
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;


