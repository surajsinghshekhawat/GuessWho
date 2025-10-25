import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LobbyPage from "./pages/LobbyPage";
import GamePage from "./pages/GamePage";
import WinnerPage from "./pages/WinnerPage";
import { GameProvider } from "./store/GameStore";

function App() {
  return (
    <GameProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/lobby/:roomCode" element={<LobbyPage />} />
            <Route path="/game/:roomCode" element={<GamePage />} />
            <Route path="/winner/:roomCode" element={<WinnerPage />} />
          </Routes>
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;
