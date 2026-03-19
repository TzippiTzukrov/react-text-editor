import { useState, useRef } from "react";
import { flushSync } from "react-dom";
import "./SearchReplaceControl.css";

export default function SearchReplace({ setTextParts, setHistory, textParts }) {
  const [searchText, setSearchText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showReplace, setShowReplace] = useState(false);
  const [searchResults, setSearchResults] = useState("");
  const countRef = useRef(0);
  const didRunRef = useRef(false);

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

  const mergeAndClean = (parts) => {
    const merged = [];
    parts.forEach((part) => {
      const style = part.style?.backgroundColor === "yellow"
        ? { ...part.style, backgroundColor: undefined }
        : part.style;
      const last = merged[merged.length - 1];
      if (last && JSON.stringify(last.style) === JSON.stringify(style)) {
        last.text += part.text;
      } else {
        merged.push({ text: part.text, style });
      }
    });
    return merged;
  };

  const handleSearch = () => {
    if (!searchText) return;
    const regex = buildEscapedRegex(searchText);
    countRef.current = 0;
    didRunRef.current = false;

    flushSync(() => {
      setTextParts((prevParts) => {
        const merged = mergeAndClean(prevParts);
        if (!didRunRef.current) {
          didRunRef.current = true;
          let total = 0;
          merged.forEach((part) => {
            total += (part.text?.match(new RegExp(regex.source, "gi")) || []).length;
          });
          countRef.current = total;
        }
        const newParts = [];
        merged.forEach((part) => {
          const localRegex = new RegExp(regex.source, "gi");
          splitTextWithMatches(part.text, localRegex).forEach((seg) => {
            newParts.push({ text: seg.text, style: seg.isMatch ? { ...part.style, backgroundColor: "yellow" } : part.style });
          });
        });
        return newParts;
      });
    });

    setSearchResults(countRef.current > 0 ? `Found ${countRef.current} result(s).` : "No results found.");

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