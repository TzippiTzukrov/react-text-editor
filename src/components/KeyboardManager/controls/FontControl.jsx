import { useState } from "react";

const FONT_OPTIONS = ["arial", "verdana", "times new roman", "courier new", "georgia", "tahoma"];
const FONT_SIZES = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 72];

export default function fontControl({ setStyle, getCurrentStyle }) {
  const [isSelectFont, setSelectFont] = useState(false);

  const toggleFont = () => setSelectFont(!isSelectFont);

  const handleFontChange = (newFont) => {
    setStyle((prev) => ({ color: prev.color, fontSize: prev.fontSize, fontFamily: newFont }));
    setSelectFont(false);
  };
  const handleSizeChange = (action) => {
    let currentSize = FONT_SIZES.indexOf(parseInt(getCurrentStyle().fontSize));
    if (currentSize === -1) currentSize = 5; 
    if (action === 'larger' && currentSize < FONT_SIZES.length - 1) {
      currentSize += 1;
    } else if (action === 'smaller' && currentSize > 0) {
      currentSize -= 1;
    }
    setStyle((prev) => ({ color: prev.color, fontSize: FONT_SIZES[currentSize], fontFamily: prev.fontFamily }));
  };
  if (isSelectFont) {
    return (
      <>
        <div className="selectFont">
          <div className="font-panel-header">
            <button className="panel-close-btn" onClick={() => setSelectFont(false)} />
          </div>
          {FONT_OPTIONS.map((font) => (
            <button key={font} className="font-option" style={{ fontFamily: font }}
              onClick={() => handleFontChange(font)}>
              {font}
            </button>
          ))}
        </div>
        <div className="size-control">
          <div className="selectSize">
            <button className="bigger-text" onClick={() => handleSizeChange('larger')}>+</button>
            <span id="display-current-size">{getCurrentStyle().fontSize}</span>
            <button className="smaller-text" onClick={() => handleSizeChange('smaller')}>-</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="font-control">
        <button onClick={toggleFont} className="font-Btn">Aa</button>
      </div>
      <div className="size-control">
        <div className="selectSize">
          <button className="bigger-text" onClick={() => handleSizeChange('larger')}>
            +
          </button>
          <span id="display-current-size">{getCurrentStyle().fontSize}</span>
          <button className="smaller-text" onClick={() => handleSizeChange('smaller')}>
            -
          </button>
        </div>
      </div>
    </>
  );
}