import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGame } from "../store/GameStore";
import GameBoard from "../components/GameBoard";
import SecretCharacterPanel from "../components/SecretCharacterPanel";
import CharacterSelectionModal from "../components/CharacterSelectionModal";
import GuessModal from "../components/GuessModal";
import QuestionAnswerModal from "../components/QuestionAnswerModal";
import AnswerModal from "../components/AnswerModal";
import WrongGuessModal from "../components/WrongGuessModal";

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
    winnerId,
    isCorrect,
    guessedCharacter,
    correctCharacter,
    mySecretCharacter,
    opponentSecretCharacter,
    myEliminatedCharacters,
    hasAskedQuestion,
    hasMadeGuess,
    socket,
    showQuestionModal,
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
    showWrongGuessModal,
    closeWrongGuessModal,
    resetGame,
    playAgain,
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
    console.log("GamePage useEffect - gameState:", gameState, "roomCode:", roomCode);
    if (gameState === "finished") {
      console.log("Game finished, navigating to winner page");
      navigate(`/winner/${roomCode}`);
    }
  }, [gameState, navigate, roomCode]);

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
  };

  const handleGoHome = () => {
    resetGame();
    navigate("/");
  };

  const handlePlayAgain = () => {
    playAgain();
    navigate(`/lobby/${roomCode}`);
  };

  const handleGuess = (characterId) => {
    guessCharacter(characterId);
    setShowGuessModal(false);
  };

  const isMyTurn = currentTurn === players.find((p) => p.id === socket?.id)?.id;

  console.log("GamePage - Turn Debug:", {
    currentTurn,
    myPlayerId: players.find((p) => p.id === socket?.id)?.id,
    isMyTurn,
    players: players.map((p) => ({ id: p.id, username: p.username })),
  });

  if (gameState === "waiting" || gameState === "theme-selection") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-500 to-blue-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎮</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Waiting for Game to Start
          </h2>
          <p className="text-gray-600 mb-6">
            The host needs to select a theme to begin the game
          </p>
          <button
            onClick={handleGoHome}
            className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (gameState === "character-selection") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-500 to-blue-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">👤</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Selecting Characters
          </h2>
          <p className="text-gray-600 mb-6">
            Players are choosing their secret characters
          </p>
          <div className="space-y-2">
            {players.map((player) => (
              <div key={player.id} className="flex items-center justify-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${player.id === socket?.id ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                <span className="text-gray-700">
                  {player.username} {player.id === socket?.id ? '(You)' : ''}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-blue-600 p-4">
      <div className="max-w-7xl mx-auto">
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
            
            <div className="flex items-center space-x-4">
              {/* Turn Indicator */}
              <div className={`px-4 py-2 rounded-lg font-semibold ${
                isMyTurn 
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {isMyTurn ? 'Your Turn' : 'Opponent\'s Turn'}
              </div>
              
              {/* Turn Counter */}
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                <span className="text-gray-700 font-semibold">Turn {turnCount + 1}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Game Area */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Game Board */}
          <div className="lg:col-span-2">
            <GameBoard
              characters={characters}
              eliminatedCharacters={myEliminatedCharacters}
              onCharacterClick={handleCharacterClick}
              isMyTurn={isMyTurn}
            />
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-1">
            <SecretCharacterPanel
              mySecretCharacter={mySecretCharacter}
              opponentEliminatedCharacters={opponentEliminatedCharacters}
              characters={characters}
              onMakeGuess={() => setShowGuessModal(true)}
              isMyTurn={isMyTurn}
              hasAskedQuestion={hasAskedQuestion}
              hasMadeGuess={hasMadeGuess}
            />
          </div>
        </div>

        {/* Question Input */}
        {isMyTurn && !hasAskedQuestion && !hasMadeGuess && (
          <div className="mt-6 bg-white rounded-2xl shadow-2xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Ask a Question</h3>
            <div className="flex space-x-4">
              <input
                type="text"
                value={myQuestion}
                onChange={(e) => setMyQuestion(e.target.value)}
                placeholder="Does your person wear glasses?"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && handleAskQuestion()}
              />
              <button
                onClick={handleAskQuestion}
                disabled={!myQuestion.trim()}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed shadow-lg"
              >
                Ask Question
              </button>
            </div>
          </div>
        )}

        {/* End Turn Button */}
        {isMyTurn && (hasAskedQuestion || hasMadeGuess) && (
          <div className="mt-6 text-center">
            <button
              onClick={endTurn}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              End Turn
            </button>
          </div>
        )}

        {/* Last Question/Answer Display */}
        {lastQuestion && lastAnswer !== null && (
          <div className="mt-6 bg-white rounded-2xl shadow-2xl p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Last Question & Answer</h3>
            <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-xl p-4 border-2 border-yellow-300">
              <p className="text-gray-700 text-lg">
                <span className="font-semibold">Q:</span> "{lastQuestion}"
              </p>
              <p className="text-gray-700 text-lg mt-2">
                <span className="font-semibold">A:</span> {lastAnswer ? "Yes" : "No"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <CharacterSelectionModal
        isOpen={showCharacterSelection}
        onClose={() => setShowCharacterSelection(false)}
        characters={characters}
        onSelectCharacter={handleCharacterSelect}
      />

      <GuessModal
        isOpen={showGuessModal}
        onClose={() => setShowGuessModal(false)}
        characters={characters}
        onGuess={handleGuess}
      />

      <QuestionAnswerModal
        isOpen={showQuestionModal}
        onClose={closeQuestionModal}
        question={currentQuestion}
        onAnswer={handleAnswerQuestion}
      />

      <AnswerModal
        isOpen={showAnswerModal}
        onClose={handleContinueFromAnswer}
        question={currentQuestion}
        answer={lastAnswer}
      />

      <WrongGuessModal
        isOpen={showWrongGuessModal}
        onClose={closeWrongGuessModal}
        guessedCharacter={guessedCharacter}
      />
    </div>
  );
};

export default GamePage;