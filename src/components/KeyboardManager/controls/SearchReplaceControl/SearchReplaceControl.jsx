import { useState } from "react";
import "./SearchReplaceControl.css";

export default function SearchReplace({ setTextParts, setHistory, textParts }) {
  const [searchText, setSearchText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showReplace, setShowReplace] = useState(false);
  const [searchResults, setSearchResults] = useState("");

  const buildEscapedRegex = (text) => {
    const escaped = text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(escaped, "gi"); 
  };

  const splitTextWithMatches = (text, regex) => {
    if (!text) return [{ text: "", isMatch: false }];
    const segments = [];
    let lastIndex = 0;
    for (const m of text.matchAll(regex)) {
      const start = m.index ?? 0;
      const matchText = m[0];

      if (start > lastIndex) {
        segments.push({ text: text.slice(lastIndex, start), isMatch: false });
      }
      segments.push({ text: matchText, isMatch: true });
      lastIndex = start + matchText.length;
    }
    if (lastIndex < text.length) {
      segments.push({ text: text.slice(lastIndex), isMatch: false });
    }
    return segments;
  };

  const clearHighlights = () => {
    setTextParts((prevParts) => {
      return prevParts.map((part) => ({
        ...part,
        style:
          part.style?.backgroundColor === "yellow"
            ? { ...part.style, backgroundColor: undefined }
            : part.style,
      }));
    });
  };

  const handleSearch = () => {
    if (!searchText) return;

    const regex = buildEscapedRegex(searchText);

    // Count matches directly on current textParts - outside any updater
    let totalMatches = 0;
    textParts.forEach((part) => {
      const localRegex = new RegExp(regex.source, "gi");
      totalMatches += (part.text?.match(localRegex) || []).length;
    });

    setSearchResults(totalMatches > 0 ? `Found ${totalMatches} result(s).` : "No results found.");

    setTextParts((prevParts) => {
      const newParts = [];
      prevParts.forEach((part) => {
        const localRegex = new RegExp(regex.source, "gi");
        const segments = splitTextWithMatches(part.text, localRegex);
        segments.forEach((seg) => {
          newParts.push({ text: seg.text, style: seg.isMatch ? { ...part.style, backgroundColor: "yellow" } : part.style });
        });
      });
      return newParts;
    });

    setTimeout(() => {
      clearHighlights();
      setSearchResults("");
    }, 3000);
  };

  const handleReplace = () => {
    if (!searchText) return;

    setTextParts((prevParts) => {
      setHistory((prev) => [...prev, { textParts: prevParts }]);

      return prevParts.map((part) => ({
        ...part,
        text: part.text.replaceAll(searchText, replaceText),
        style:
          part.style && part.style.backgroundColor === "yellow"
            ? { ...part.style, backgroundColor: undefined }
            : part.style,
      }));
    });

    setSearchResults("");
  };

  if (!showSearch && !showReplace) {
    return (
      <>
        <button className="search-toggle" onClick={() => setShowSearch(true)}>
          🔍
        </button>
        <button className="replace-toggle" onClick={() => setShowReplace(true)}>
          🔄
        </button>
      </>
    );
  }

  if (showSearch) {
    return (
      <div className="search-panel">
        <div className="search-panel-header">
          <button className="panel-close-btn" onClick={() => { setShowSearch(false); setSearchResults(""); clearHighlights(); }} />
        </div>
        <div className="search-input">
          <input
            type="text"
            placeholder="search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className="search-buttons">
          <button onClick={handleSearch}>🔍</button>
        </div>
        {searchResults && <div className="search-results">{searchResults}</div>}
      </div>
    );
  }

  if (showReplace) {
    return (
      <div className="replace-panel">
        <div className="search-panel-header">
          <button className="panel-close-btn" onClick={() => setShowReplace(false)} />
        </div>
        <div className="replace-inputs">
          <input
            type="text"
            placeholder="search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <input
            type="text"
            placeholder="replace..."
            value={replaceText}
            onChange={(e) => setReplaceText(e.target.value)}
          />
        </div>
        <div className="replace-buttons">
          <button onClick={handleReplace}>🔄</button>
        </div>
      </div>
    );
  }
}