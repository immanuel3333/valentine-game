import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { generateMaze, solve } from "./util";
import "./Maze.scss";
import { motion } from "framer-motion";

const gridSize = 10;

function MazeGame() {
  const navigate = useNavigate();
  const [gameId, setGameId] = useState(1);
  const [status, setStatus] = useState("playing");
  const [cheatMode, setCheatMode] = useState(false);
  const [userPosition, setUserPosition] = useState([0, 0]);

  const maze = useMemo(() => generateMaze(gridSize, gridSize), [gameId]);
  const solution = useMemo(() => {
    const s = new Set();
    solve(maze, userPosition[0], userPosition[1]).forEach(([x, y]) => {
      s.add(`${x}-${y}`);
    });
    return s;
  }, [userPosition, gameId]);

  useEffect(() => {
    if (userPosition[0] === gridSize - 1 && userPosition[1] === gridSize - 1) {
      setStatus("won");
      setTimeout(() => {
        navigate("/success"); // Mengarahkan ke halaman sukses
      }, 500);
    }
  }, [userPosition, navigate]);

  const makeClassName = (i, j) => {
    let arr = [];
    if (maze[i][j][0] === 0) arr.push("topWall");
    if (maze[i][j][1] === 0) arr.push("rightWall");
    if (maze[i][j][2] === 0) arr.push("bottomWall");
    if (maze[i][j][3] === 0) arr.push("leftWall");
    if (i === gridSize - 1 && j === gridSize - 1) arr.push("destination");
    if (i === userPosition[0] && j === userPosition[1])
      arr.push("currentPosition");
    if (cheatMode && solution.has(`${i}-${j}`)) arr.push("sol");
    return arr.join(" ");
  };

  const movePlayer = (direction) => {
    if (status !== "playing") return;
    const [i, j] = userPosition;
    if (direction === "up" && maze[i][j][0] === 1) setUserPosition([i - 1, j]);
    if (direction === "right" && maze[i][j][1] === 1)
      setUserPosition([i, j + 1]);
    if (direction === "down" && maze[i][j][2] === 1)
      setUserPosition([i + 1, j]);
    if (direction === "left" && maze[i][j][3] === 1)
      setUserPosition([i, j - 1]);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">
        Yuk berjuang biar sampai tujuan!!
      </h1>
      <div className="flex justify-center">
        <table id="maze" className="border-2 border-black">
          <tbody>
            {maze.map((row, i) => (
              <tr key={`row-${i}`}>
                {row.map((_, j) => (
                  <td key={`cell-${i}-${j}`} className={makeClassName(i, j)}>
                    <span className="icon">
                      {i === userPosition[0] && j === userPosition[1]
                        ? "💖"
                        : ""}
                      {i === gridSize - 1 && j === gridSize - 1 ? "🎁" : ""}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col items-center mt-4">
        <motion.button
          whileTap={{ scale: 0.8 }}
          className="px-4 py-2 bg-blue-500 text-white rounded mb-2"
          onClick={() => movePlayer("up")}
        >
          ⬆
        </motion.button>
        <div className="flex gap-4">
          <motion.button
            whileTap={{ scale: 0.8 }}
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => movePlayer("left")}
          >
            ⬅
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.8 }}
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => movePlayer("right")}
          >
            ➡
          </motion.button>
        </div>
        <motion.button
          whileTap={{ scale: 0.8 }}
          className="px-4 py-2 bg-blue-500 text-white rounded mt-2"
          onClick={() => movePlayer("down")}
        >
          ⬇
        </motion.button>
      </div>
    </div>
  );
}

export default MazeGame;
