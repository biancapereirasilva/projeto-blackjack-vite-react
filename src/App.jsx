import { Routes, Route } from "react-router-dom";
import { GameProvider } from "./context/GameContext";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Game from "./pages/Game";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <ThemeProvider>
      <GameProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/game" element={<Game />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </GameProvider>
    </ThemeProvider>
  );
}

export default App;
