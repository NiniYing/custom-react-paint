import React, { useEffect } from 'react';
import { ShapeSelector } from './ShapeSelector';
import { ColorPickerComponent } from './ColorPickerComponent';
import { Slider, Button } from 'antd';
import { useDrawing } from './hooks/useDrawing';

const CanvasDrawing: React.FC = () => {
  const {
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
  } = useDrawing();

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      setIsDrawing(true);
      setStartPoint({ x: event.offsetX, y: event.offsetY });
    };

    const handleMouseUp = (event: MouseEvent) => {
      if (!isDrawing || !canvasRef.current) return;
      const endPoint = { x: event.offsetX, y: event.offsetY };
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        drawShape(ctx, shape, color, lineWidth, startPoint, endPoint);
      }
      setIsDrawing(false);
    };

    if (canvasRef.current) {
      canvasRef.current.addEventListener('mousedown', handleMouseDown);
      canvasRef.current.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('mousedown', handleMouseDown);
        canvasRef.current.removeEventListener('mouseup', handleMouseUp);
      }
    };
  }, [shape, color, lineWidth, isDrawing, startPoint, drawShape]);

  return (
    <>
      <ShapeSelector onShapeChange={setShape} />
      <ColorPickerComponent onColorChange={setColor} />
      <Slider min={1} max={20} defaultValue={1} onChange={value => setLineWidth(value as number)} />
      <Button onClick={clearCanvas}>清除画布</Button>
      <Button onClick={exportImage}>导出为图片</Button>
      <canvas ref={canvasRef} width={1000} height={700} style={{ border: '1px solid #000', marginTop: '20px' }}></canvas>
    </>
  );
};

export default CanvasDrawing;