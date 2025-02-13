import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import PuzzleGame from "./pages/PuzzleGame.jsx";
import MazeGame from "./pages/MazeGame.jsx";
import SuccessPage from "./pages/SuccessPage.jsx";

function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-pink-100">
      <div className="max-w-xl w-full px-6 py-12 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Happy Valentine Day, Tia!
        </h1>
        <p className="text-lg text-gray-600 mt-2">
          Ayo mainkan game spesial ini biar kamu dapat hadiahnya
        </p>
        <Link to="/puzzle">
          <button className="mt-4 px-6 py-3 bg-pink-500 text-white rounded-lg shadow-md hover:bg-pink-700">
            Mulai Bermain
          </button>
        </Link>
      </div>
    </div>
  );
}

function App() {
  // 🎵 Musik latar belakang
  const audioRef = useRef(new Audio("/music/music-romantic.mp3"));
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    audioRef.current.loop = true; // Musik akan terus dimainkan
    audioRef.current.volume = 0.5; // Atur volume awal

    // Fungsi untuk memainkan audio setelah interaksi pertama
    const enableAudio = () => {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          document.removeEventListener("click", enableAudio);
        })
        .catch((error) => console.error("Playback error:", error));
    };

    document.addEventListener("click", enableAudio);
    return () => {
      document.removeEventListener("click", enableAudio);
    };
  }, []);

  // 🎵 Toggle Play/Pause Musik
  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current
        .play()
        .catch((error) => console.error("Playback error:", error));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Router>
      {/* 🎵 Kontrol Musik Global di bagian bawah */}
      <button className="music-button" onClick={toggleMusic}>
        {isPlaying ? "🔇 Pause Music" : "🎵 Play Music"}
      </button>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/puzzle" element={<PuzzleGame />} />
        <Route path="/MazeGame" element={<MazeGame />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
}

export default App;
