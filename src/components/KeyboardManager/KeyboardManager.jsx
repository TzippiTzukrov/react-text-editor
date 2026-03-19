import { useState } from "react";
import "./KeyboardManager.css";

import CreateKeyboard, { LANGUAGE_MODES } from "./keyboard/keyboard.jsx";
import DisplayControlKeys from "./controls/ControlManager.jsx";

export default function DisplayKB({ activeEditor }) {
  const [mode, setMode] = useState(LANGUAGE_MODES[0]);
  if (!activeEditor) {
    return null
  }

  return (
    <div className="editor-area">
      <DisplayControlKeys activeEditor={activeEditor} setMode={setMode} />
      <CreateKeyboard
        setHistory={activeEditor.setHistory}
        mode={mode}
        setTextParts={activeEditor.setTextParts}
        getCurrentStyle={()=>activeEditor.styleText}
        disabled={false}
      />
    </div>
  );
}
