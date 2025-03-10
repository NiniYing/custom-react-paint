import React from 'react';

interface ColorPickerProps {
    onColorChange: (color: string) => void;
}

export const ColorPickerComponent: React.FC<ColorPickerProps> = ({ onColorChange }) => (
    <div>
        <label htmlFor="color">选择颜色:</label>
        <input type="color" id="color" onChange={e => onColorChange(e.target.value)} />
    </div>
);