import { TouchEvent } from 'react';

import { getColorMapKey } from 'util/common';

import { Grid, GridType } from 'component/atom';
import { useColorMapStore } from 'store/ColorMapStore';
import { useToolStore } from 'store/ToolStore';
import { Tool } from 'type/common';

interface Props {
  mode: GridType;
}

function GridEditor({ mode }: Props) {
  const tool = useToolStore((state) => state.tool);
  const picker = useToolStore((state) => state.picker);
  const isOn = useToolStore((state) => state.isOn);
  const setIsOn = useToolStore((state) => state.setIsOn);
  const colorMap = useColorMapStore((state) => state.colorMap);
  const setColorMap = useColorMapStore((state) => state.setColorMap);

  const handleDraw = (key?: string, isStart?: boolean) => {
    if (!key) return;
    if (!tool || (!isStart && !isOn)) return;
    if (!isOn) setIsOn(true);
    if (tool === Tool.ERASER) {
      delete colorMap[key];
      setColorMap(colorMap);
      return;
    }
    colorMap[key] = picker;
    setColorMap(colorMap);
  };

  return (
    <Grid
      mode={mode}
      tdProps={(key) => ({
        onMouseDown: () => handleDraw(key, true),
        onMouseMove: () => handleDraw(key),
        onTouchStart: () => handleDraw(key, true),
        onTouchMove: (e) => handleDraw(getTouchMoveKey(e)),
      })}
    />
  );
}

export default GridEditor;

const getTouchMoveKey = (event: TouchEvent<HTMLTableCellElement>) => {
  const touch = event.touches[0];
  if (!touch) return;
  const { clientX, clientY } = touch;
  if (!clientX || !clientY) return;
  const element = document.elementFromPoint(touch.clientX, touch.clientY);
  if (element?.tagName !== 'TD') return;
  const td = element as HTMLTableCellElement;
  const tr = td.parentElement as HTMLTableRowElement;
  const yIndex = Array.from(tr.parentElement!.children).indexOf(tr);
  const xIndex = Array.from(tr.children).indexOf(td);
  const key = getColorMapKey(xIndex, yIndex);
  return key;
};
