import React, { useEffect, useState } from "react";

const GridWave = ({ rows = 15, cols = 20 }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((t) => t + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const getColor = (row, col) => {
    const wave = Math.sin(time / 5 + col / 2);
    const intensity = Math.max(0, 1 - Math.abs(row - (rows / 2 + wave * (rows / 2))));
    const green = Math.floor(50 + intensity * 205);
    return `rgb(0, ${green}, 0)`;
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div
        style={{
          display: "grid",
          gridTemplateRows: `repeat(${rows}, 20px)`,
          gridTemplateColumns: `repeat(${cols}, 20px)`,
          gap: "2px",
        }}
      >
        {Array.from({ length: rows * cols }).map((_, i) => {
          const row = Math.floor(i / cols);
          const col = i % cols;
          return (
            <div
              key={i}
              style={{
                width: 20,
                height: 20,
                backgroundColor: getColor(row, col),
                transition: "background-color 0.2s linear",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GridWave;
