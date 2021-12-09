import { useState } from "react";

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (next, replace = false) => {
    setHistory((prev) => replace ? [...prev.slice(0, prev.length - 1), next] : [...prev, next]);
    setMode(next);
  }

  const back = () => {
    if (history.length === 1) return
    setHistory((prev) => prev.slice(0, prev.length - 1));
    const last = history[history.length - 2];
    setMode(last);
  }

  return { mode, transition, back }
}

export default useVisualMode;