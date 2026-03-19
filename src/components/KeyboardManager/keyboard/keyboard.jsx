import { useState } from "react";
import "./keyboard.css";

const ENGLISH_KEYS = {
  row1: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  row2: ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  row3: ["z", "x", "c", "v", "b", "n"]
};
const HEBREW_KEYS = {
  row1: ["ק", "ר", "א", "ט", "ו", "ן", "ם", "פ", "ש", "ד"],
  row2: ["ג", "כ", "ע", "י", "ח", "ל", "ז", "ס", "ב"],
  row3: ["ה", "נ", "מ", "צ", "ת", "ץ"]
};
const NUMBERS_KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const SYMBOLS_KEYS = {
  row1: ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"],
  row2: [";", "'", "[", "]", "-", "=", ",", ".", "/"],
  row3: ["`", "~", "<", ">", "?", ":"]
};

export const LANGUAGE_MODES = [ENGLISH_KEYS, HEBREW_KEYS, SYMBOLS_KEYS];

export default function createKeyboard({
  setHistory,
  mode,
  setTextParts,
  getCurrentStyle,
}) {
  const [isShift, setIsShift] = useState(false);
  const [isCaps, setIsCaps] = useState(false);
  function handleKeyPress(key) {
    if (key === "SHIFT") {
      setIsShift((prev) => !prev);
      return;
    }
    if (key === "CAPS") {
      setIsCaps((prev) => !prev);
      return;
    }
    if (key === "TAB") {
      key = "\t";
    }
    if (key === "CTRL") {
      return;
    }
    if (isShift && /^[a-zA-Z]$/.test(key)) {
      setIsShift(false);
    }

    setTextParts((prevParts) => {
      let newParts = [...prevParts];
      const currentStyle = getCurrentStyle();
      const lastPart = newParts[newParts.length - 1];

      if (key === "BACKSPACE") {
        if (newParts.length === 0) return newParts;

        if (lastPart.text.length > 1) {
          newParts[newParts.length - 1] = {
            ...lastPart,
            text: lastPart.text.slice(0, -1),
          };
        } else {
          newParts.pop();
        }
      } else if (key === "delete word") {
        if (newParts.length === 0) return newParts;
        let lastPartIndex = newParts.length - 1;
        let lastPart = newParts[lastPartIndex];
        let text = lastPart.text;

        let lastSpaceIndex = text.lastIndexOf(" ");

        if (lastSpaceIndex === -1) {
          newParts.pop();
        } else {
          newParts[lastPartIndex] = {
            ...lastPart,
            text: text.substring(0, lastSpaceIndex),
          };
        }
      }
      else if (key === "delete all") {
        newParts = [];
      } else {
        let charToAdd = key;
        if (key === "ENTER") {
          charToAdd = "\n";
        } else if (key === "SPACE") charToAdd = " ";

        if (
          lastPart &&
          JSON.stringify(lastPart.style) === JSON.stringify(currentStyle)
        ) {
          newParts[newParts.length - 1] = {
            ...lastPart,
            text: lastPart.text + charToAdd,
          };
        } else {
          newParts.push({
            text: charToAdd,
            style: currentStyle,
          });
        }
      }
      setHistory((prev) => [...prev, { textParts: prevParts }]);
      return newParts;
    });
  }

  return (
    <div className="keyboard">
      <div className="keyboard-row numbers-row">
        {NUMBERS_KEYS.map((key, index) => (
          <button
            key={`number-${index}`}
            className="numberKey"
            onClick={() => handleKeyPress(key)}
          >
            {key}
          </button>
        ))}
        <button className="backspaceKey" onClick={() => handleKeyPress("BACKSPACE")}>⌫</button>
      </div>

      <div className="keyboard-row first-row">
        <button className="tabKey" onClick={() => handleKeyPress("TAB")}>Tab</button>
        {mode.row1.map((key, index) => (
          <button
            key={`row1-${index}`}
            className="letterKey"
            onClick={() => handleKeyPress((isShift || isCaps) ? key.toUpperCase() : key)}
          >
            {(isShift || isCaps) ? key.toUpperCase() : key}
          </button>
        ))}
      </div>

      <div className="keyboard-row second-row">
        <button
          className={`capsKey ${isCaps ? 'active' : ''}`}
          onClick={() => handleKeyPress("CAPS")}>
          Caps</button>
        {mode.row2.map((key, index) => (
          <button
            key={`row2-${index}`}
            className="letterKey"
            onClick={() => handleKeyPress((isShift || isCaps) ? key.toUpperCase() : key)}
          >
            {(isShift || isCaps) ? key.toUpperCase() : key}
          </button>
        ))}
        <button className="enterKey" onClick={() => handleKeyPress("ENTER")}>↵</button>
      </div>

      <div className="keyboard-row third-row">
        <button className={`shiftKey ${isShift ? 'active' : ''}`} onClick={() => handleKeyPress("SHIFT")}>⇧</button>
        {mode.row3.map((key, index) => (
          <button
            key={`row3-${index}`}
            className="letterKey"
            onClick={() => handleKeyPress((isShift || isCaps) ? key.toUpperCase() : key)}
          >
            {(isShift || isCaps) ? key.toUpperCase() : key}
          </button>
        ))}
        <button className="delete-word" onClick={() => handleKeyPress("delete word")}>⌦ Word</button>
      </div>

      <div className="keyboard-row space-row">
        <button className="ctrlKey" onClick={() => handleKeyPress("CTRL")}>Ctrl</button>
        <button className="spaceKey" onClick={() => handleKeyPress("SPACE")}>␣</button>
        <button className="delete-all" onClick={() => handleKeyPress("delete all")}>⌧ All</button>
      </div>
    </div>
  );
}
