import { useState } from "react";
import { LANGUAGE_MODES } from "../keyboard/keyboard.jsx";

export default function LanguageSelector({ setMode }) {
  const [languageIndex, setlanguageIndex] = useState(0);

  const handleLanguageChange = () => {
    const newIndex = (languageIndex + 1) % LANGUAGE_MODES.length;
    setlanguageIndex(newIndex);
    setMode(LANGUAGE_MODES[newIndex]);
  };

  return (
    <div className="language-selector">
      <button onClick={handleLanguageChange}>🌐</button>
    </div>
  );
}
