import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LobbyPage from "./pages/LobbyPage";
import GamePage from "./pages/GamePage";
import WinnerPage from "./pages/WinnerPage";
import { GameProvider } from "./store/GameStore";

// Component to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <GameProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-gray-100">
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
