const { generateRoomCode } = require("../utils/gameUtils");
const { characters } = require("../utils/characters");

// Store active rooms
const rooms = new Map();

const registerSocketHandlers = (io) => {
  io.on("connection", (socket) => {
    console.log(`Player connected: ${socket.id}`);

    // Create a new room
    socket.on("createRoom", (data) => {
      const { username } = data;
      const roomCode = generateRoomCode();

      const room = {
        code: roomCode,
        players: [
          {
            id: socket.id,
            username,
            isHost: true,
          },
        ],
        gameState: "waiting",
        theme: null,
        characters: [],
        playerCharacters: new Map(), // playerId -> characterId
        eliminatedCharacters: new Map(), // playerId -> [characterIds]
        currentTurn: null,
        turnCount: 0,
        currentQuestion: null,
        currentAnswer: null,
        waitingForAnswer: false,
      };

      rooms.set(roomCode, room);
      socket.join(roomCode);

      socket.emit("roomCreated", {
        roomCode,
        players: room.players,
      });

      console.log(`Room created: ${roomCode} by ${username}`);
    });

    // Join an existing room
    socket.on("joinRoom", (data) => {
      const { roomCode, username } = data;
      const room = rooms.get(roomCode);

      if (!room) {
        socket.emit("error", { message: "Room not found" });
        return;
      }

      if (room.players.length >= 2) {
        socket.emit("error", { message: "Room is full" });
        return;
      }

      const player = {
        id: socket.id,
        username,
        isHost: false,
      };

      room.players.push(player);
      socket.join(roomCode);

      // Send roomJoined event to the joining player
      socket.emit("roomJoined", {
        players: room.players,
        gameState: room.gameState,
        roomCode: roomCode,
      });

      // Notify all other players in the room about the new player
      socket.to(roomCode).emit("playerJoined", {
        players: room.players,
      });

      console.log(`${username} joined room ${roomCode}`);
    });

    // Select theme
    socket.on("selectTheme", (data) => {
      const { roomCode, theme } = data;
      const room = rooms.get(roomCode);

      if (!room) {
        socket.emit("error", { message: "Room not found" });
        return;
      }

      const player = room.players.find((p) => p.id === socket.id);
      if (!player || !player.isHost) {
        socket.emit("error", { message: "Only host can select theme" });
        return;
      }

      room.theme = theme;
      room.characters = characters[theme] || [];
      room.gameState = "character-selection";

      io.to(roomCode).emit("themeSelected", {
        theme,
        characters: room.characters,
      });

      console.log(`Theme ${theme} selected for room ${roomCode}`);
    });

    // Select character
    socket.on("selectCharacter", (data) => {
      const { roomCode, characterId } = data;
      const room = rooms.get(roomCode);

      if (!room) {
        socket.emit("error", { message: "Room not found" });
        return;
      }

      room.playerCharacters.set(socket.id, characterId);
      room.eliminatedCharacters.set(socket.id, []);

      // Check if both players have selected characters
      if (room.playerCharacters.size === 2) {
        const players = Array.from(room.playerCharacters.keys());
        room.currentTurn = players[0]; // First player starts
        room.gameState = "playing";

        // Send individual character selections to each player
        players.forEach((playerId) => {
          const myCharacterId = room.playerCharacters.get(playerId);
          const opponentId = players.find((p) => p !== playerId);
          const opponentCharacterId = room.playerCharacters.get(opponentId);

          io.to(playerId).emit("characterSelected", {
            myCharacterId,
            opponentCharacterId,
            currentTurn: room.currentTurn,
            turnCount: room.turnCount,
          });
        });
      }

      console.log(`Player ${socket.id} selected character ${characterId}`);
    });

    // Ask question
    socket.on("askQuestion", (data) => {
      const { roomCode, question } = data;
      const room = rooms.get(roomCode);

      if (!room) {
        socket.emit("error", { message: "Room not found" });
        return;
      }

      if (room.currentTurn !== socket.id) {
        socket.emit("error", { message: "Not your turn" });
        return;
      }

      // Store the current question
      room.currentQuestion = question;
      room.waitingForAnswer = true;

      io.to(roomCode).emit("questionAsked", {
        question,
        askingPlayer: socket.id,
      });

      console.log(`Player ${socket.id} asked: ${question}`);
    });

    // Answer question
    socket.on("answerQuestion", (data) => {
      const { roomCode, answer } = data;
      const room = rooms.get(roomCode);

      if (!room) {
        socket.emit("error", { message: "Room not found" });
        return;
      }

      if (!room.waitingForAnswer) {
        socket.emit("error", { message: "No question to answer" });
        return;
      }

      room.waitingForAnswer = false;
      room.currentAnswer = answer;

      io.to(roomCode).emit("questionAnswered", {
        answer,
        question: room.currentQuestion,
      });

      console.log(`Player ${socket.id} answered: ${answer}`);
    });

    // Eliminate character
    socket.on("eliminateCharacter", (data) => {
      const { roomCode, characterId } = data;
      const room = rooms.get(roomCode);

      if (!room) {
        socket.emit("error", { message: "Room not found" });
        return;
      }

      if (room.currentTurn !== socket.id) {
        socket.emit("error", { message: "Not your turn" });
        return;
      }

      const playerEliminated = room.eliminatedCharacters.get(socket.id) || [];
      if (!playerEliminated.includes(characterId)) {
        playerEliminated.push(characterId);
        room.eliminatedCharacters.set(socket.id, playerEliminated);
      }

      // Send elimination updates to each player individually
      const players = Array.from(room.playerCharacters.keys());
      players.forEach((playerId) => {
        const myEliminatedCharacters =
          room.eliminatedCharacters.get(playerId) || [];
        const opponentId = players.find((p) => p !== playerId);
        const opponentEliminatedCharacters =
          room.eliminatedCharacters.get(opponentId) || [];

        io.to(playerId).emit("characterEliminated", {
          eliminatedCharacters: myEliminatedCharacters,
          opponentEliminatedCharacters,
        });
      });

      console.log(`Player ${socket.id} eliminated character ${characterId}`);
    });

    // End turn
    socket.on("endTurn", (data) => {
      const { roomCode } = data;
      const room = rooms.get(roomCode);

      if (!room) {
        socket.emit("error", { message: "Room not found" });
        return;
      }

      if (room.currentTurn !== socket.id) {
        socket.emit("error", { message: "Not your turn" });
        return;
      }

      // Switch turns
      const players = Array.from(room.playerCharacters.keys());
      const currentIndex = players.indexOf(socket.id);
      room.currentTurn = players[(currentIndex + 1) % players.length];
      room.turnCount++;

      io.to(roomCode).emit("turnChanged", {
        currentTurn: room.currentTurn,
        turnCount: room.turnCount,
      });

      console.log(`Player ${socket.id} ended their turn`);
    });

    // Guess character
    socket.on("guessCharacter", (data) => {
      const { roomCode, characterId } = data;
      const room = rooms.get(roomCode);

      if (!room) {
        socket.emit("error", { message: "Room not found" });
        return;
      }

      if (room.currentTurn !== socket.id) {
        socket.emit("error", { message: "Not your turn" });
        return;
      }

      const opponentId = Array.from(room.playerCharacters.keys()).find(
        (p) => p !== socket.id
      );
      const opponentCharacterId = room.playerCharacters.get(opponentId);

      const isCorrect = characterId === opponentCharacterId;
      const winner = isCorrect ? socket.id : opponentId;

      room.gameState = "finished";

      io.to(roomCode).emit("gameOver", {
        winner,
        isCorrect,
        guessedCharacter: room.characters.find((c) => c.id === characterId),
        correctCharacter: room.characters.find(
          (c) => c.id === opponentCharacterId
        ),
      });

      console.log(
        `Player ${socket.id} guessed character ${characterId}, correct: ${isCorrect}`
      );
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(`Player disconnected: ${socket.id}`);

      // Find and remove player from rooms
      for (const [roomCode, room] of rooms.entries()) {
        const playerIndex = room.players.findIndex((p) => p.id === socket.id);
        if (playerIndex !== -1) {
          room.players.splice(playerIndex, 1);

          if (room.players.length === 0) {
            rooms.delete(roomCode);
            console.log(`Room ${roomCode} deleted (no players)`);
          } else {
            // Notify remaining players
            io.to(roomCode).emit("playerLeft", {
              players: room.players,
            });
          }
          break;
        }
      }
    });
  });
};

module.exports = registerSocketHandlers;
