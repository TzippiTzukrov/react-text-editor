import { useState } from "react";

const EMOJI_LIST = [
  "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇",
  "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚",
  "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩",
  "🥳", "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣",
  "😖", "😫", "😩", "🥺", "😢", "😭", "🤗", "😤", "😠", "😡",
  "🤯", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗",
  "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "😬", "🙄", "😯",
  "😦", "😧", "😮", "😲", "🥱", "😴", "🤤", "😪", "😵", "🤐",
  "🥴", "🤢", "🤮", "🤧", "😷", "🤒", "🤕", "🤑", "🤠", "😈",
  "👍", "👎", "👌", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉",
  "👆", "🖕", "👇", "☝️", "👋", "🤚", "🖐️", "✋", "🖖", "👏",
  "🙌", "🤲", "🤝", "🙏", "✍️", "💅", "🤳", "💪", "🦾", "🦿",
  "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔",
  "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "☮️"
];

export default function EmojiControl({ setTextParts,setHistory, getCurrentStyle }) {
  const [showEmojis, setShowEmojis] = useState(false);

  const handleEmojiClick = (emoji) => {
    const currentStyle = getCurrentStyle();
    setTextParts((prevParts) => {
      setHistory((prev) => [...prev, { textParts: prevParts }]);
      return [...prevParts, { text: emoji, style: currentStyle }];
    });
    setShowEmojis(false);
  };

  if (showEmojis) {
    return (
      <div className="emoji-panel">
        <div className="emoji-panel-header">
          <button className="panel-close-btn" style={{ alignSelf: 'flex-start' }} onClick={() => setShowEmojis(false)} />
        </div>
        <div className="emoji-panel-grid">
          {EMOJI_LIST.map((emoji, index) => (
            <button key={index} className="emoji-option" onClick={() => handleEmojiClick(emoji)}>
              {emoji}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setShowEmojis(true)} className="emoji-btn">😀</button>
    </div>
  );
}