import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGame } from "../store/GameStore";
import GameBoard from "../components/GameBoard";
import SecretCharacterPanel from "../components/SecretCharacterPanel";
import CharacterSelectionModal from "../components/CharacterSelectionModal";
import GuessModal from "../components/GuessModal";
import QuestionAnswerModal from "../components/QuestionAnswerModal";
import EndTurnModal from "../components/EndTurnModal";
import AnswerModal from "../components/AnswerModal";

const GamePage = () => {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const {
    connectSocket,
    isConnected,
    players,
    gameState,
    theme,
    characters,
    mySecretCharacterId,
    opponentSecretCharacterId,
    eliminatedCharacters,
    opponentEliminatedCharacters,
    currentTurn,
    turnCount,
    winner,
    socket,
    showQuestionModal,
    showEndTurnModal,
    showAnswerModal,
    currentQuestion,
    lastQuestion,
    lastAnswer,
    selectSecretCharacter,
    toggleEliminated,
    guessCharacter,
    askQuestion,
    answerQuestion,
    endTurn,
    closeQuestionModal,
    closeAnswerModal,
    showEndTurnButton,
    closeEndTurnModal,
    resetGame,
  } = useGame();

  const [showCharacterSelection, setShowCharacterSelection] = useState(false);
  const [showGuessModal, setShowGuessModal] = useState(false);
  const [myQuestion, setMyQuestion] = useState("");

  useEffect(() => {
    if (!isConnected) {
      connectSocket("Guest");
    }
  }, [isConnected, connectSocket]);

  useEffect(() => {
    if (gameState === "character-selection" && !mySecretCharacterId) {
      setShowCharacterSelection(true);
    }
  }, [gameState, mySecretCharacterId]);

  useEffect(() => {
    if (gameState === "finished") {
      // Game ended, show results
      setTimeout(() => {
        navigate("/");
      }, 5000);
    }
  }, [gameState, navigate]);

  const handleCharacterSelect = (characterId) => {
    selectSecretCharacter(characterId);
    setShowCharacterSelection(false);
  };

  const handleCharacterClick = (characterId) => {
    if (
      gameState === "playing" &&
      currentTurn === players.find((p) => p.id === socket?.id)?.id
    ) {
      toggleEliminated(characterId);
    }
  };

  const handleAskQuestion = () => {
    if (myQuestion.trim()) {
      askQuestion(myQuestion);
      setMyQuestion("");
    }
  };

  const handleAnswerQuestion = (answer) => {
    answerQuestion(answer);
  };

  const handleContinueFromAnswer = () => {
    closeAnswerModal();
    showEndTurnButton(); // Show end turn button after continuing
  };

  const handleGuess = (characterId) => {
    guessCharacter(characterId);
    setShowGuessModal(false);
  };

  const isMyTurn = currentTurn === players.find((p) => p.id === socket?.id)?.id;

  // Debug turn management
  console.log("GamePage - Turn Debug:", {
    currentTurn,
    myPlayerId: players.find((p) => p.id === socket?.id)?.id,
    isMyTurn,
    players: players.map((p) => ({ id: p.id, username: p.username })),
  });
  const mySecretCharacter = characters.find(
    (c) => c.id === mySecretCharacterId
  );
  const opponentSecretCharacter = characters.find(
    (c) => c.id === opponentSecretCharacterId
  );

  if (gameState === "waiting" || gameState === "theme-selection") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-blue-800 mb-4">
            Room: {roomCode}
          </h1>
          <p className="text-gray-600">Waiting for game to start...</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (gameState === "finished") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-green-600 mb-4">Game Over!</h1>
          <p className="text-xl text-gray-700 mb-6">
            {winner ? `${winner.username} wins!` : "Game ended"}
          </p>
          <div className="space-y-4">
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 mr-4"
            >
              Back to Home
            </button>
            <button
              onClick={resetGame}
              className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700"
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/")}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
              >
                ← Home
              </button>
              <div>
                <h1 className="text-2xl font-bold text-blue-800">
                  Room: {roomCode}
                </h1>
                <p className="text-gray-600">Theme: {theme}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Turn: {turnCount}</p>
              <p className="text-sm font-medium">
                {isMyTurn ? "Your turn" : "Opponent's turn"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Game Board */}
          <div className="lg:col-span-2">
            <GameBoard
              characters={characters}
              eliminatedCharacters={eliminatedCharacters}
              onCharacterClick={handleCharacterClick}
              isMyTurn={isMyTurn}
              currentTurn={currentTurn}
            />
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            {/* Secret Character Panel */}
            <SecretCharacterPanel
              mySecretCharacter={mySecretCharacter}
              opponentSecretCharacter={opponentSecretCharacter}
              opponentEliminatedCharacters={opponentEliminatedCharacters}
              characters={characters}
              onGuessCharacter={() => setShowGuessModal(true)}
              isMyTurn={isMyTurn}
            />

            {/* Question Panel */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Game Actions</h2>

              {lastQuestion && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Last question:</p>
                  <p className="font-medium">"{lastQuestion}"</p>
                  {lastAnswer !== null && (
                    <p className="text-sm text-gray-600 mt-1">
                      Answer:{" "}
                      <span className="font-medium">
                        {lastAnswer ? "Yes" : "No"}
                      </span>
                    </p>
                  )}
                </div>
              )}

              {isMyTurn ? (
                <div className="space-y-4">
                  <div>
                    <textarea
                      value={myQuestion}
                      onChange={(e) => setMyQuestion(e.target.value)}
                      placeholder="Ask a yes/no question..."
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                      rows={3}
                    />
                    <button
                      onClick={handleAskQuestion}
                      disabled={!myQuestion.trim()}
                      className="w-full mt-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Ask Question
                    </button>
                  </div>

                  <div className="text-center">
                    <p className="text-gray-600 mb-2">Or</p>
                    <button
                      onClick={() => setShowGuessModal(true)}
                      className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                    >
                      Make a Guess
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-gray-600">Waiting for your turn...</p>
                </div>
              )}
            </div>

            {/* Players Status */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Players</h2>
              <div className="space-y-3">
                {players.map((player) => (
                  <div
                    key={player.id}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      currentTurn === player.id
                        ? "bg-blue-50 border-2 border-blue-300"
                        : "bg-gray-50"
                    }`}
                  >
                    <span className="font-medium">{player.username}</span>
                    <div className="flex items-center space-x-2">
                      {player.isHost && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          Host
                        </span>
                      )}
                      {currentTurn === player.id && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          Turn
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Character Selection Modal */}
      <CharacterSelectionModal
        characters={characters}
        onSelectCharacter={handleCharacterSelect}
        isOpen={showCharacterSelection}
        onClose={() => setShowCharacterSelection(false)}
      />

      {/* Guess Modal */}
      <GuessModal
        characters={characters}
        onGuess={handleGuess}
        isOpen={showGuessModal}
        onClose={() => setShowGuessModal(false)}
      />

      {/* Question Answer Modal */}
      <QuestionAnswerModal
        isOpen={showQuestionModal}
        question={currentQuestion}
        onAnswer={handleAnswerQuestion}
        onClose={closeQuestionModal}
        isMyTurn={isMyTurn}
      />

      {/* Answer Modal */}
      <AnswerModal
        isOpen={showAnswerModal}
        question={lastQuestion}
        answer={lastAnswer}
        onContinue={handleContinueFromAnswer}
        onClose={closeAnswerModal}
      />

      {/* End Turn Modal */}
      <EndTurnModal
        isOpen={showEndTurnModal}
        onEndTurn={endTurn}
        onClose={closeEndTurnModal}
        lastQuestion={lastQuestion}
        lastAnswer={lastAnswer}
      />
    </div>
  );
};

export default GamePage;
