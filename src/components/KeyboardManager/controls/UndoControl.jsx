export default function UndoControl({ setHistory, setTextParts }) {
  const handleUNDO = () => {
    setTextParts((currentParts) => {
      setHistory((prev) => {
        if (!prev || prev.length === 0) return prev;
        const lastState = prev[prev.length - 1];
        setTextParts(lastState.textParts);
        return prev.slice(0, -1);
      });
      return currentParts;
    });
  };
  return (
    <button className="undoBtn" onClick={handleUNDO}>
   ↶
    </button>
  );
}