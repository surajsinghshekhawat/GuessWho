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

  // UI state
  isLoading: false,
  error: null,
  showCharacterSelection: false,
  waitingForAnswer: false,
  showQuestionModal: false,
  showEndTurnModal: false,
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
      set({
        players: data.players,
        isHost: false,
        gameState: data.gameState || "waiting",
      });
    });

    socket.on("playerJoined", (data) => {
      set({ players: data.players });
    });

    socket.on("themeSelected", (data) => {
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
      set({
        waitingForAnswer: false,
        showQuestionModal: false,
        lastQuestion: data.question,
        lastAnswer: data.answer,
        showEndTurnModal: true,
      });
    });

    socket.on("turnChanged", (data) => {
      set({
        currentTurn: data.currentTurn,
        turnCount: data.turnCount,
      });
    });

    socket.on("characterEliminated", (data) => {
      set({
        eliminatedCharacters: data.eliminatedCharacters,
        opponentEliminatedCharacters: data.opponentEliminatedCharacters,
      });
    });

    socket.on("gameOver", (data) => {
      set({
        winner: data.winner,
        gameState: "finished",
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
    if (socket) {
      socket.emit("askQuestion", { roomCode, question });
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

  closeEndTurnModal: () => {
    set({ showEndTurnModal: false });
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
      showCharacterSelection: false,
      showQuestionModal: false,
      showEndTurnModal: false,
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
