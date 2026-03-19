import { useState, useEffect, useRef } from "react";
import "./DisplayArea.css";

export default function DisplayArea({ index, onFocus, onClose, currentUser, initialFile, onFileSaved }) {
  const [history, setHistory] = useState([]);
  const [fileName, setFileName] = useState(initialFile?.name || `FileName_${index}`);
  const [showSaveBox, setShowSaveBox] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);
  const [textParts, setTextParts] = useState(initialFile?.content || []);
  const [styleText, setStyleText] = useState({
    color: "black",
    fontSize: 18,
    fontFamily: "arial",
  });

  useEffect(() => {
    textAreaRef.current.style.caretColor = "black";
    textAreaRef.current.focus();
  }, [styleText]);

  const textAreaRef = useRef(null);

  const handleFocus = () => {
    onFocus({
      textParts,
      setTextParts,
      history,
      setHistory,
      styleText,
      setStyleText,
    });
  };

  useEffect(() => {
    if (textAreaRef.current === document.activeElement) {
      onFocus({
        textParts,
        setTextParts,
        history,
        setHistory,
        styleText,
        setStyleText,
      });
    }
  }, [textParts]);
  const closeScrean = () => {
    onClose();
  };
  const deleteFile = () => {
    setSavedMsg("deleted");
    setTimeout(() => {
      setSavedMsg(false);
      closeScrean();
    }, 1500);
  };
  const saveFile = () => {
    setShowSaveBox(true);
  };

  const confirmSave = () => {
    try {
      const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const newFile = {
        name: fileName,
        content: textParts,
        date: new Date().toISOString(),
      };
      const updatedUsers = allUsers.map(u =>
        u.email === currentUser ? { ...u, files: [...(u.files || []), newFile] } : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      setShowSaveBox(false);
      setSavedMsg(true);

      if (onFileSaved) {
        onFileSaved();
      }

      setTimeout(() => {
        setSavedMsg(false), closeScrean();
      }, 1500);
    } catch (error) {
      console.error('Error saving file:', error);
      setShowSaveBox(false);
    }
  };

  return (
    <div className="display-area">
      <div
        ref={textAreaRef}
        className="display-text"
        contentEditable
        suppressContentEditableWarning={true}
        style={{ caretColor: styleText.color, whiteSpace: 'pre-wrap' }}
        onFocus={handleFocus}
        onKeyDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onBeforeInput={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onPaste={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onCut={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {textParts.map((part, i) => {
          const segments = part.text.split("\n");
          return segments.map((seg, si) => (
            <span key={`${i}-${si}`} style={part.style}>
              {seg}
              {si < segments.length - 1 && <br />}
            </span>
          ));
        })}
      </div>

      <div className="display-area-controls">
        <button onClick={deleteFile} className="trush">
          🗑️ Move to trash
        </button>
        <button onClick={saveFile} className="save">
          💾 Save
        </button>
      </div>

      {showSaveBox && (
        <form
          className="save-box"
          onSubmit={(e) => {
            e.preventDefault();
            confirmSave();
          }}
        >
          <input
            type="text"
            placeholder="Enter File Name"
            required
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />
          <button type="submit">Save</button>
        </form>
      )}

      {savedMsg && <div className="saved-msg">{savedMsg === "deleted" ? "🗑️ File Deleted" : "✔️ File Saved"}</div>}
    </div>
  );
}

