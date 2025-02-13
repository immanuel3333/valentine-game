import React, { useEffect, useState } from "react";
import "./Puzzle.css";
import { useNavigate } from "react-router-dom";

function PuzzleGame() {
  const imgUrl = "/images/puzzle.jpg"; // Pastikan gambar ini ada di folder public
  const [positions, setPositions] = useState([...Array(16).keys()]);
  const [isSolved, setIsSolved] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [touchStartIndex, setTouchStartIndex] = useState(null); // Untuk menyimpan index pertama yang disentuh
  const navigate = useNavigate();

  useEffect(() => {
    setPositions((prevPositions) => {
      const newPos = [...prevPositions];
      newPos.sort(() => Math.random() - 0.5);
      return newPos;
    });
  }, []);

  // Fungsi untuk drag & drop biasa (desktop)
  const handleDragStart = (e, position) => {
    e.dataTransfer.setData("text/plain", position);
  };

  const handleDrop = (e, position) => {
    e.preventDefault();
    const originalPosition = e.dataTransfer.getData("text");
    swapPositions(originalPosition, position);
  };

  // Fungsi untuk mobile: touch & swap
  const handleTouchStart = (index) => {
    setTouchStartIndex(index);
  };

  const handleTouchEnd = (index) => {
    if (touchStartIndex !== null) {
      swapPositions(touchStartIndex, index);
      setTouchStartIndex(null);
    }
  };

  // Fungsi untuk menukar posisi kotak puzzle
  const swapPositions = (fromIndex, toIndex) => {
    setPositions((prevPositions) => {
      const newPos = [...prevPositions];
      [newPos[fromIndex], newPos[toIndex]] = [
        newPos[toIndex],
        newPos[fromIndex],
      ];

      // Cek apakah puzzle sudah tersusun dengan benar
      const isComplete = newPos.every((pos, index) => pos === index);
      setIsSolved(isComplete);

      return newPos;
    });
  };

  return (
    <div className="game-container">
      {/* Tombol untuk Menampilkan Preview */}
      {!showPreview && (
        <div className="text-center mt-4">
          <p className="text-lg text-gray-700">
            🤔 Kamu bingung dan menyerah? Klik tombol ini!
          </p>
          <button
            className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-700"
            onClick={() => setShowPreview(true)}
          >
            Tampilkan Preview Gambar
          </button>
        </div>
      )}

      {/* Preview Gambar (Tersembunyi di Awal) */}
      {showPreview && (
        <div className="reference-image mt-4">
          <img src={imgUrl} alt="Reference" />
        </div>
      )}

      {/* Puzzle Container */}
      <div className="puzzle-container">
        {positions.map((pos, index) => {
          const x = (pos % 4) * (window.innerWidth < 768 ? 100 : 100);
          const y = Math.floor(pos / 4) * (window.innerWidth < 768 ? 100 : 100);

          return (
            <div
              key={index}
              className="puzzle-piece"
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragOver={(e) => e.preventDefault()}
              onTouchStart={() => handleTouchStart(index)}
              onTouchEnd={() => handleTouchEnd(index)}
              style={{
                backgroundImage: `url('${imgUrl}')`,
                backgroundPosition: `-${x}px -${y}px`,
              }}
            />
          );
        })}
      </div>

      {/* Jika Puzzle Selesai */}
      {isSolved && (
        <div className="mt-4 p-4 bg-white shadow-lg rounded-lg text-center">
          <h2 className="text-2xl font-bold text-green-600">
            🎉 Puzzle Selesai! 🎉
          </h2>
          <p className="text-gray-600">
            Selamat! Kamu berhasil menyusun puzzle dengan benar.
          </p>
          <button
            className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700"
            onClick={() => navigate("/MazeGame")}
          >
            Lanjut ke Game Berikutnya
          </button>
        </div>
      )}
    </div>
  );
}

export default PuzzleGame;
