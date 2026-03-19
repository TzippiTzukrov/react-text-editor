import "./App.css";
import { useState } from "react";
import Menu from "./components/Menu/menu.jsx";
import KeyboardManager from "./components/KeyboardManager/KeyboardManager.jsx";
import LoginSignup from "./components/Login/login.jsx";

function App() {
  const [isEntered, setIsEntered] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeEditor, setActiveEditor] = useState(null);
  const handleEditorFocus = (editorAPI) => {
    try {
      setActiveEditor(() => editorAPI);
    } catch (error) {
      console.error('Error setting active editor:', error);
    }
  };

  return (
    <div className="app-container">
      <div className="main-content">
        {!isEntered && (
          <LoginSignup setIsEntered={setIsEntered} setCurrentUser={setCurrentUser} />
        )}
        {isEntered && (
          <>
            <Menu
              onFocus={handleEditorFocus}
              setStyleText={activeEditor?.setStyleText}
              currentUser={currentUser}
            />
            <div className="keyboard-manager">
              <KeyboardManager activeEditor={activeEditor} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
