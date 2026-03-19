import { useState, useEffect, useRef } from "react";
import DisplayArea from "./DisplayArea/DisplayArea";
import "./Menu.css";
export default function Menu({ onFocus, currentUser }) {
  const [screenIndex, setScreenIndex] = useState(0);
  const [screens, setScreens] = useState([]);
  const [fileData, setFileData] = useState({});
  const [refreshHistory, setRefreshHistory] = useState(0);
  const [openFilesExpanded, setOpenFilesExpanded] = useState(false);
  const [historyExpanded, setHistoryExpanded] = useState(false);
  const [menuHeight, setMenuHeight] = useState(120);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 900);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;
    const observer = new ResizeObserver(() => {
      if (window.innerWidth <= 900) {
        setMenuHeight(menuRef.current.offsetHeight);
      }
    });
    observer.observe(menuRef.current);
    return () => observer.disconnect();
  }, []);

  function handleNewFile() {
    setScreenIndex((s) => s + 1);
    setScreens((prev) => [...prev, screenIndex]);
  }

  const currentUserHistory = () =>{
    try {
      const allHistories = JSON.parse(localStorage.getItem("users") || "[]");
      const user = (allHistories || []).find((u) => u.email === currentUser);
      return user?.files || [];
    } catch (error) {
      console.error('Error loading user history:', error);
      return [];
    }
  }

  const userFiles = currentUserHistory();

  return (
    <>
    <div className="menu-container" ref={menuRef}>
      <div className="menu-header">
        <div className="menu-logo">Menu</div>
        <button onClick={handleNewFile}>New File</button>
      </div>
      <div className="open-files">
        <div className="open-files-header">
          Open Files
          <button className="collapse-btn" onClick={() => setOpenFilesExpanded(p => !p)} aria-label="toggle">
            <svg className={`chevron${openFilesExpanded ? ' open' : ''}`} width="12" height="12" viewBox="0 0 12 12" fill="none">
              <polyline points="2,4 6,8 10,4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className={`collapsible-content${openFilesExpanded ? ' expanded' : ''}`}>
        {screens.map((index) => (
          <div key={index} className="open-file-tab">
            File {index + 1}
            <button onClick={() => {
              setScreens((prev) => prev.filter((i) => i !== index));
            }}>x</button>
          </div>
        ))}
        </div>
      </div>
      <div className="user-history">
        <div className="user-history-header">
          History
          <button className="collapse-btn" onClick={() => setHistoryExpanded(p => !p)} aria-label="toggle">
            <svg className={`chevron${historyExpanded ? ' open' : ''}`} width="12" height="12" viewBox="0 0 12 12" fill="none">
              <polyline points="2,4 6,8 10,4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <div className={`collapsible-content${historyExpanded ? ' expanded' : ''}`}>
        {
        userFiles.map((file, idx) => (
          <div key={idx} className="history-file">
            {file.name}
            <br />
            {file.date.slice(0, 10)}

            <button onClick={() => {
              const newIndex = screenIndex;
              setScreens((prev) => [...prev, newIndex]);
              setScreenIndex((s) => s + 1);
              setFileData(prev => ({ ...prev, [newIndex]: file }));

              try {
                const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
                const updatedUsers = allUsers.map(u => {
                  if (u.email !== currentUser) return u;
                  const filtered = (u.files || []).filter(f => !(f.name === file.name && f.date === file.date));
                  return { ...u, files: filtered };
                });
                localStorage.setItem("users", JSON.stringify(updatedUsers));
              } catch (error) {
                console.error('Error removing file from history:', error);
              }
            }}>Edit</button>
          </div>
        ))}
        </div>
      </div>
    </div>
    {screens.length > 0 && (
      <div className="open-files-container" style={isSmallScreen ? { top: `${menuHeight + 16}px` } : undefined}>
        {screens.map((index) => (
          <DisplayArea
          key={index}
            index={index}
            onFocus={onFocus}
            onClose={() => {
              setScreens((prev) => prev.filter((i) => i !== index));
              setFileData(prev => {
                const newData = { ...prev };
                delete newData[index];
                return newData;
              });
            }}
            currentUser={currentUser}
            initialFile={fileData[index]}
            onFileSaved={() => setRefreshHistory(prev => prev + 1)}
          />
        ))}
      </div>
    )}
    </>
  );
}
