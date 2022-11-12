import React from "react";
import "./App.css";
import { useState } from "react";

type TypePoint = {
  x: number;
  y: number;
};

function App() {
  const [points, setPoints] = useState<TypePoint[]>([]);
  const [popped, setPopped] = useState<TypePoint[]>([]);

  function handlePlaceCircle(e: React.MouseEvent<HTMLDivElement>) {
    const { clientX, clientY } = e;
    setPoints([...points, { x: clientX, y: clientY }]);
  }

  function handleUndo() {
    // setPoints([...points.slice(0, points.length - 1)]);
    const newPoints = [...points];
    const poppedPoint = newPoints.pop();
    
    if (!poppedPoint) return;
    setPopped([...popped, poppedPoint]);
    setPoints(newPoints);
  }

  function handleRedo() {
    const newPopped = [...popped];
    const poppedPoint = newPopped.pop();

    if (!poppedPoint) return;
    setPopped(newPopped);
    setPoints([...points, poppedPoint]);
  }

  return (
    <>
      <button disabled={points.length === 0} onClick={handleUndo}>
        Undo
      </button>
      <button disabled={popped.length === 0} onClick={handleRedo}>
        Redo
      </button>

      <div className="App" onClick={handlePlaceCircle}>
        {points.map((point, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              left: point.x,
              top: point.y,
              width: 10,
              height: 10,
              backgroundColor: "blue",
            }}
          />
        ))}
      </div>
    </>
  );
}

export default App;
