const { v4: uuidv4 } = require("uuid");

// Generate a random room code
const generateRoomCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Generate a unique player ID
const generatePlayerId = () => {
  return uuidv4();
};

// Select random characters for a theme
const selectRandomCharacters = (theme, count = 24) => {
  const CHARACTERS = require("./characters");
  const themeCharacters = CHARACTERS[theme] || [];

  if (themeCharacters.length <= count) {
    return themeCharacters;
  }

  const shuffled = [...themeCharacters].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Assign secret characters to players
const assignSecretCharacters = (characters) => {
  const shuffled = [...characters].sort(() => 0.5 - Math.random());
  return {
    player1: shuffled[0].id,
    player2: shuffled[1].id,
  };
};

module.exports = {
  generateRoomCode,
  generatePlayerId,
  selectRandomCharacters,
  assignSecretCharacters,
};



