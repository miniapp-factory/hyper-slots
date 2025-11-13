"use client";

import { useState } from "react";
import { url } from "@/lib/metadata";
import Share from "@/components/share";

const fruits = [
  { name: "apple", image: "/apple.png" },
  { name: "banana", image: "/banana.png" },
  { name: "cherry", image: "/cherry.png" },
];

function randomFruit() {
  return fruits[Math.floor(Math.random() * fruits.length)];
}

export default function SlotMachine() {
  const [grid, setGrid] = useState<string[][]>(
    Array.from({ length: 3 }, () =>
      Array.from({ length: 3 }, () => randomFruit().name)
    )
  );
  const [spinning, setSpinning] = useState(false);
  const [win, setWin] = useState(false);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setWin(false);
    let ticks = 0;
    const interval = setInterval(() => {
      setGrid((prev) => {
        const newGrid = prev.map((row) => [...row]);
        // shift each column down
        for (let col = 0; col < 3; col++) {
          for (let row = 2; row > 0; row--) {
            newGrid[row][col] = newGrid[row - 1][col];
          }
          newGrid[0][col] = randomFruit().name;
        }
        return newGrid;
      });
      ticks++;
      if (ticks >= 10) {
        clearInterval(interval);
        setSpinning(false);
        const center = grid[1];
        if (center[0] === center[1] && center[1] === center[2]) {
          setWin(true);
        }
      }
    }, 200);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="grid grid-cols-3 gap-2">
        {grid.map((row, rIdx) =>
          row.map((fruitName, cIdx) => {
            const fruit = fruits.find((f) => f.name === fruitName);
            return (
              <div key={`${rIdx}-${cIdx}`} className="flex justify-center items-center">
                <img
                  src={fruit?.image}
                  alt={fruit?.name}
                  width={64}
                  height={64}
                />
              </div>
            );
          })
        )}
      </div>
      <button
        className="px-4 py-2 bg-primary text-primary-foreground rounded"
        onClick={spin}
        disabled={spinning}
      >
        {spinning ? "Spinning..." : "Spin"}
      </button>
      {win && (
        <div className="mt-4 text-green-600">
          <p>Congratulations! You won!</p>
          <Share
            text={`I won the slot machine! ${url}`}
          />
        </div>
      )}
    </div>
  );
}
