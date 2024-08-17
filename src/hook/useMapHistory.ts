import { useColorMapStore } from 'store/ColorMapStore';
import { Color } from 'type/common';

export function useMapHistory() {
  const { history, historyIndex, setColorMap, setHistory, setHistoryIndex } = useColorMapStore(
    (state) => state,
  );

  const undo = () => {
    if (historyIndex <= 0) return;
    const newIndex = historyIndex - 1;
    setColorMap({ ...history[newIndex] });
    setHistoryIndex(newIndex);
  };

  const redo = () => {
    const lastIndex = history.length - 1;
    if (historyIndex >= lastIndex) return;
    const newIndex = historyIndex + 1;
    setColorMap({ ...history[newIndex] });
    setHistoryIndex(newIndex);
  };

  const addHistory = (colorMap: Color) => {
    let newHistory: Color[] = [...history];
    const newIndex = historyIndex + 1;
    const lastIndex = newHistory.length - 1;
    if (newIndex <= lastIndex) {
      newHistory = newHistory.slice(0, newIndex);
    }
    newHistory.push({ ...colorMap });
    setHistory(newHistory);
    setHistoryIndex(newIndex);
  };

  return { undo, redo, addHistory };
}
