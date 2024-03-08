import { useEffect, useState } from "react";
import { useRef } from "react";

function App() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingStartPosition, setDrawingStartPosition] = useState(null);
  const [boxes, setBoxes] = useState([
    {
      x: 200,
      y: 300,
      height: 200,
      width: 100,
    },
    {
      x: 400,
      y: 20,
      height: 50,
      width: 50,
    },
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.backgroundColor = "yellow";
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  useEffect(() => {
    boxes.forEach((box) => {
      contextRef.current.beginPath();
      contextRef.current.moveTo(box.x, box.y);
      contextRef.current.lineTo(box.x + box.width, box.y);
      contextRef.current.lineTo(box.x + box.width, box.y + box.height);
      contextRef.current.lineTo(box.x, box.y + box.height);
      contextRef.current.lineTo(box.x, box.y);
      contextRef.current.stroke();
    });
  }, [boxes]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    setDrawingStartPosition({ x: offsetX, y: offsetY });
    // contextRef.current.beginPath();
    // contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    if (drawingStartPosition) {
      setBoxes([
        ...boxes,
        {
          x: drawingStartPosition.x,
          y: drawingStartPosition.y,
          width: offsetX - drawingStartPosition.x,
          height: offsetY - drawingStartPosition.y,
        },
      ]);
      setDrawingStartPosition(null);
    }
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }) => {};

  return (
    <>
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
    </>
  );
}

export default App;
