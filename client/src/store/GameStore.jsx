import React, { createContext, useContext } from "react";
import { create } from "zustand";
import { io } from "socket.io-client";

// Create the Zustand store directly here
const useGameStore = create((set, get) => ({
  // Connection state
  socket: null,
  isConnected: false,
  playerId: null,
  username: "",

  // Room state
  roomCode: null,
  players: [],
  isHost: false,

  // Game state
  gameState: "waiting", // 'waiting', 'theme-selection', 'character-selection', 'playing', 'finished'
  theme: null,
  characters: [],
  mySecretCharacterId: null,
  opponentSecretCharacterId: null,
  eliminatedCharacters: [], // Characters eliminated by current player
  opponentEliminatedCharacters: [], // Characters eliminated by opponent
  currentTurn: null,
  turnCount: 0,
  winner: null,
  winnerId: null,
  isCorrect: null,
  guessedCharacter: null,
  correctCharacter: null,
  mySecretCharacter: null,
  opponentSecretCharacter: null,
  myEliminatedCharacters: [],
  opponentEliminatedCharacters: [],

  // Turn state
  hasAskedQuestion: false,
  hasMadeGuess: false,

  // UI state
  isLoading: false,
  error: null,
  showCharacterSelection: false,
  waitingForAnswer: false,
  showQuestionModal: false,
  showEndTurnModal: false,
  showAnswerModal: false,
  showWrongGuessModal: false,
  currentQuestion: null,
  currentAnswer: null,
  lastQuestion: null,
  lastAnswer: null,

  // Actions
  connectSocket: (username) => {
    const socket = io(
      import.meta.env.VITE_SERVER_URL || "http://localhost:3001"
    );

    socket.on("connect", () => {
      set({ isConnected: true, socket, playerId: socket.id, username });
    });

    socket.on("disconnect", () => {
      set({ isConnected: false });
    });

    socket.on("roomCreated", (data) => {
      set({
        roomCode: data.roomCode,
        players: data.players,
        isHost: true,
        gameState: "waiting",
      });
    });

    socket.on("roomJoined", (data) => {
      console.log("Room joined event received:", data);
      set({
        roomCode: data.roomCode,
        players: data.players,
        isHost: false,
        gameState: data.gameState || "waiting",
      });
    });

    socket.on("playerJoined", (data) => {
      set({ players: data.players });
    });

    socket.on("themeSelected", (data) => {
      console.log("Theme selected event received:", data);
      set({
        theme: data.theme,
        characters: data.characters,
        gameState: "character-selection",
        showCharacterSelection: true,
      });
    });

    socket.on("characterSelected", (data) => {
      set({
        mySecretCharacterId: data.myCharacterId,
        opponentSecretCharacterId: data.opponentCharacterId,
        mySecretCharacter: data.mySecretCharacter,
        opponentSecretCharacter: data.opponentSecretCharacter,
        gameState: "playing",
        showCharacterSelection: false,
        currentTurn: data.currentTurn,
        turnCount: data.turnCount || 0,
      });
    });

    socket.on("questionAsked", (data) => {
      set({
        waitingForAnswer: true,
        showQuestionModal: true,
        currentQuestion: data.question,
        askingPlayer: data.askingPlayer,
      });
    });

    socket.on("questionAnswered", (data) => {
      const { socket: currentSocket } = get();
      // Show answer to asker, but don't show end turn modal yet
      const isAsker = currentSocket?.id === data.askingPlayer;

      set({
        waitingForAnswer: false,
        showQuestionModal: false,
        lastQuestion: data.question,
        lastAnswer: data.answer,
        showEndTurnModal: false, // Don't show end turn modal immediately
        askingPlayer: data.askingPlayer,
        showAnswerModal: isAsker, // Show answer modal to asker
        // Keep hasAskedQuestion as true - don't reset until turn ends
      });
    });

    socket.on("turnChanged", (data) => {
      console.log("turnChanged event received:", data);
      set({
        currentTurn: data.currentTurn,
        turnCount: data.turnCount,
        hasAskedQuestion: false, // Reset question flag for new turn
        hasMadeGuess: false, // Reset guess flag for new turn
      });
      console.log(
        "turnChanged - reset hasAskedQuestion and hasMadeGuess to false"
      );
    });

    socket.on("characterEliminated", (data) => {
      set({
        eliminatedCharacters: data.eliminatedCharacters,
        opponentEliminatedCharacters: data.opponentEliminatedCharacters,
      });
    });

    socket.on("gameOver", (data) => {
      console.log("gameOver event received:", data);
      console.log("gameOver - data.winner:", data.winner, "typeof:", typeof data.winner);
      set({
        winner: data.winner,
        winnerId: data.winnerId,
        isCorrect: data.isCorrect,
        guessedCharacter: data.guessedCharacter,
        correctCharacter: data.correctCharacter,
        mySecretCharacter: data.mySecretCharacter,
        opponentSecretCharacter: data.opponentSecretCharacter,
        myEliminatedCharacters: data.myEliminatedCharacters,
        opponentEliminatedCharacters: data.opponentEliminatedCharacters,
        gameState: "finished",
      });
      console.log("gameOver - set winner to:", data.winner);
    });

    socket.on("wrongGuess", (data) => {
      set({
        hasMadeGuess: false, // Reset guess flag since turn ended
        showWrongGuessModal: true,
        guessedCharacter: data.guessedCharacter,
        correctCharacter: data.correctCharacter,
      });
    });

    socket.on("opponentWrongGuess", (data) => {
      set({
        // Could show a notification that opponent made wrong guess
        // For now, just log it
      });
      console.log("Opponent made wrong guess:", data.opponentName);
    });

    socket.on("gameReset", (data) => {
      set({
        gameState: data.gameState,
        characters: [],
        mySecretCharacterId: null,
        opponentSecretCharacterId: null,
        mySecretCharacter: null,
        opponentSecretCharacter: null,
        eliminatedCharacters: [],
        opponentEliminatedCharacters: [],
        turnCount: 0,
        currentTurn: null,
        winner: null,
        hasAskedQuestion: false,
        hasMadeGuess: false,
        showCharacterSelection: false,
        showQuestionModal: false,
        showEndTurnModal: false,
        showAnswerModal: false,
        showWrongGuessModal: false,
        currentQuestion: null,
        currentAnswer: null,
        lastQuestion: null,
        lastAnswer: null,
        error: null,
      });
    });

    socket.on("error", (error) => {
      set({ error: error.message });
    });

    set({ socket });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null, isConnected: false });
    }
  },

  createRoom: (username) => {
    const { socket } = get();
    if (socket) {
      socket.emit("createRoom", { username });
    }
  },

  joinRoom: (roomCode, username) => {
    const { socket } = get();
    if (socket) {
      socket.emit("joinRoom", { roomCode, username });
    }
  },

  selectTheme: (theme) => {
    const { socket, roomCode } = get();
    if (socket) {
      socket.emit("selectTheme", { roomCode, theme });
    }
  },

  selectSecretCharacter: (characterId) => {
    const { socket, roomCode } = get();
    if (socket) {
      socket.emit("selectCharacter", { roomCode, characterId });
    }
  },

  toggleEliminated: (characterId) => {
    const { socket, roomCode } = get();
    if (socket) {
      socket.emit("eliminateCharacter", { roomCode, characterId });
    }
  },

  askQuestion: (question) => {
    const { socket, roomCode } = get();
    console.log(
      "askQuestion called - hasAskedQuestion:",
      get().hasAskedQuestion,
      "hasMadeGuess:",
      get().hasMadeGuess
    );
    if (socket) {
      socket.emit("askQuestion", { roomCode, question });
      set({ hasAskedQuestion: true }); // Mark that question was asked
      console.log("askQuestion - set hasAskedQuestion to true");
    }
  },

  answerQuestion: (answer) => {
    const { socket, roomCode } = get();
    if (socket) {
      socket.emit("answerQuestion", { roomCode, answer });
    }
  },

  guessCharacter: (characterId) => {
    const { socket, roomCode } = get();
    if (socket) {
      socket.emit("guessCharacter", { roomCode, characterId });
      set({ hasMadeGuess: true }); // Mark that guess was made
    }
  },

  endTurn: () => {
    const { socket, roomCode } = get();
    if (socket) {
      socket.emit("endTurn", { roomCode });
    }
  },

  closeQuestionModal: () => {
    set({ showQuestionModal: false });
  },

  closeAnswerModal: () => {
    set({ showAnswerModal: false });
  },

  closeWrongGuessModal: () => {
    set({ showWrongGuessModal: false });
  },

  showEndTurnButton: () => {
    set({ showEndTurnModal: true });
  },

  closeEndTurnModal: () => {
    set({ showEndTurnModal: false });
  },

  playAgain: () => {
    const { socket, roomCode } = get();
    if (socket) {
      socket.emit("playAgain", { roomCode });
    }
  },

  resetGame: () => {
    set({
      roomCode: null,
      players: [],
      isHost: false,
      gameState: "waiting",
      theme: null,
      characters: [],
      mySecretCharacterId: null,
      opponentSecretCharacterId: null,
      eliminatedCharacters: [],
      opponentEliminatedCharacters: [],
      turnCount: 0,
      currentTurn: null,
      winner: null,
      hasAskedQuestion: false,
      hasMadeGuess: false,
      showCharacterSelection: false,
      showQuestionModal: false,
      showEndTurnModal: false,
      showAnswerModal: false,
      showWrongGuessModal: false,
      currentQuestion: null,
      currentAnswer: null,
      lastQuestion: null,
      lastAnswer: null,
      error: null,
    });
  },
}));

// Create context
const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const store = useGameStore();
  return <GameContext.Provider value={store}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
