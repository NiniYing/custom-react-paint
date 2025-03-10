import React from 'react';

interface ShapeSelectorProps {
    onShapeChange: (shape: string) => void;
}

export const ShapeSelector: React.FC<ShapeSelectorProps> = ({ onShapeChange }) => (
    <div>
        <label htmlFor="shape">选择形状:</label>
        <select id="shape" onChange={e => onShapeChange(e.target.value)}>
            <option value="star">星形</option>
            <option value="square">方形</option>
        </select>
    </div>
);