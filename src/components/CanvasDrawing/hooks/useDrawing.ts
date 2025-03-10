import { useRef, useState, useCallback, useEffect } from "react";
import { drawStar } from "./drawStart"; // 画五角星
import { drawSquare } from "./drawSquare";

export function useDrawing() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shape, setShape] = useState<string>("star");
  const [color, setColor] = useState<string>("#000000");
  const [lineWidth, setLineWidth] = useState<number>(1);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const drawShape = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      shape: string,
      color: string,
      lineWidth: number,
      start: { x: number; y: number },
      end: { x: number; y: number }
    ) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      ctx.beginPath();
      switch (shape) {
        case "star":
          drawStar(ctx, start.x, start.y, Math.abs(end.x - start.x));
          break;
        case "square":
          drawSquare(
            ctx,
            start.x,
            start.y,
            Math.abs(end.x - start.x),
            Math.abs(end.y - start.y)
          );
          break;
        default:
          break;
      }
      ctx.stroke();
    },
    []
  );

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      setIsDrawing(true);
      setStartPoint({ x: event.offsetX, y: event.offsetY });
    };

    const handleMouseUp = (event: MouseEvent) => {
      if (!isDrawing || !canvasRef.current) return;
      const endPoint = { x: event.offsetX, y: event.offsetY };
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        drawShape(ctx, shape, color, lineWidth, startPoint, endPoint);
      }
      setIsDrawing(false);
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDrawing || !canvasRef.current) return;
      const currentPoint = { x: event.offsetX, y: event.offsetY };
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        drawShape(ctx, shape, color, lineWidth, startPoint, currentPoint);
      }
    };

    if (canvasRef.current) {
      canvasRef.current.addEventListener("mousedown", handleMouseDown);
      canvasRef.current.addEventListener("mouseup", handleMouseUp);
      canvasRef.current.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener("mousedown", handleMouseDown);
        canvasRef.current.removeEventListener("mouseup", handleMouseUp);
        canvasRef.current.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [shape, color, lineWidth, isDrawing, startPoint, drawShape]);

  const clearCanvas = useCallback(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }, []);

  const exportImage = useCallback(() => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = "canvas_image.png";
    link.href = canvasRef.current
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    link.click();
  }, []);

  return {
    canvasRef,
    shape,
    setShape,
    color,
    setColor,
    lineWidth,
    setLineWidth,
    isDrawing,
    setIsDrawing,
    startPoint,
    setStartPoint,
    drawShape,
    clearCanvas,
    exportImage,
  };
}
