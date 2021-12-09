import { useState } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (next) => {
    setHistory((prev) => [...prev, next]);
    setMode(next);
  }

  const back = () => {
    if (history.length === 1) return
    setHistory((prev) => {
      const removedSelfInHistory = [...prev];
      removedSelfInHistory.pop();
      return removedSelfInHistory;
    });
    const last = history[history.length - 2];
    setMode(last);
  }

  return { mode, transition, back }
}

export default useVisualMode;