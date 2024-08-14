import { useEffect } from 'react';

import { Grid } from 'component/atom';
import { useColorMapStore } from 'store/ColorMapStore';
import { usePickerStore } from 'store/PickerStore';
import { Color } from 'type/common';

function GridEditor() {
  const { picker, isEraser, isDrawing, setIsDrawing } = usePickerStore((state) => state);
  const { colorMap, history, historyIndex, setColorMap, setHistory, setHistoryIndex } = useColorMapStore(
    (state) => state,
  );

  useEffect(() => {
    if (!isDrawing) handleHistory();
  }, [isDrawing]);

  const handleDraw = (key: string, isStart?: boolean) => {
    if (!picker || (!isStart && !isDrawing)) return;
    if (!isDrawing) setIsDrawing(true);
    if (isEraser) {
      delete colorMap[key];
      setColorMap(colorMap);
      return;
    }
    colorMap[key] = picker;
    setColorMap(colorMap);
  };

  const handleHistory = () => {
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

  return (
    <Grid
      mode="edit"
      tdProps={(key) => ({
        onMouseDown: () => handleDraw(key, true),
        onMouseMove: () => handleDraw(key),
        onTouchStart: () => handleDraw(key, true),
        onTouchMove: () => handleDraw(key),
      })}
    />
  );
}

export default GridEditor;
