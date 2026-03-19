import LanguageSelector from "./LanguageSelector.jsx";
import UndoControl from "./UndoControl.jsx";
import ColorControl from "./ColorControl.jsx";
import FontControl from "./FontControl.jsx";
import EmojiControl from "./EmojiControl.jsx";
import SearchReplaceControl from "./SearchReplaceControl/SearchReplaceControl.jsx";
import "./Controls.css";
export default function DisplayControlKeys({ activeEditor, setMode }) {
  return (
    <div className="editor-area-controls">
      <EmojiControl
        setTextParts={activeEditor.setTextParts}
        setHistory={activeEditor.setHistory}
        getCurrentStyle={() => activeEditor.styleText}
      />
      <LanguageSelector setMode={setMode} />
      <UndoControl
        setHistory={activeEditor.setHistory}
        setTextParts={activeEditor.setTextParts}
      />
      <ColorControl
        setStyle={activeEditor.setStyleText}
        getCurrentStyle={() => activeEditor.styleText}
      />

      <FontControl
        setStyle={activeEditor.setStyleText}
        getCurrentStyle={() => activeEditor.styleText}
      />
      <SearchReplaceControl
        setTextParts={activeEditor.setTextParts}
        setHistory={activeEditor.setHistory}
        textParts={activeEditor.textParts}
      />
    </div>
  );
}
