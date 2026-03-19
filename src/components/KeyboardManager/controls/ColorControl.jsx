import { useState } from "react";

const COLOR_OPTIONS = [
  "#1F1F1F",
  "#5C5C5C",
  "#B0B0B0",
  "#FFFFFF",
  "#FF8FAB",
  "#FF5C8A",
  "#D291BC",
  "#457B9D",
  "#1D3557",
  "#2A9D8F",
  "#F4A261",
  "#E9C46A"
];


export default function ColorControl({setStyle, getCurrentStyle}) {
  const [isSelectColor, setSelectColor] = useState(false);

  const handleColorChange = (newColor) => {
    setStyle((prev) => ({ color: newColor, fontSize: prev.fontSize }));
    setSelectColor(false);
  };

  if (isSelectColor) {
    return (
      <div className="selectColor">
        <button className="panel-close-btn" style={{ alignSelf: 'flex-start' }} onClick={() => setSelectColor(false)} />
        <div className="selectColor-grid">
          {COLOR_OPTIONS.map((color) => (
            <div key={color} className="color-option" style={{ backgroundColor: color }}
              onClick={() => handleColorChange(color)} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setSelectColor(true)} className="color-Btn">🎨</button>
    </div>
  );
}