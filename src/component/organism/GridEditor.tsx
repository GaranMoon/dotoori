import { useEffect, useState } from 'react';

import { getColorMapKey } from 'util/common';

import { Grid, GridType } from 'component/atom';
import { useColorMapStore } from 'store/ColorMapStore';
import { useToolStore } from 'store/ToolStore';
import { Tool } from 'type/common';

type Pointer = { key: string; isStart?: boolean };

interface Props {
  mode: GridType;
}

function GridEditor({ mode }: Props) {
  const [pointer, setPointer] = useState<Pointer>();
  const { tool, picker, isOn, setIsOn } = useToolStore((state) => state);
  const { colorMap, setColorMap } = useColorMapStore((state) => state);

  useEffect(() => {
    if (pointer) handleDraw(pointer);
  }, [pointer]);

  useEffect(() => {
    const table = document.getElementById('edit')?.querySelector('table');
    if (!table) return;
    const handleTouch = (event: TouchEvent, isStart?: boolean) => {
      const touch = event.touches[0];
      if (!touch) return;
      const { clientX, clientY } = touch;
      if (!clientX || !clientY) return;
      const elementTouched = document.elementFromPoint(touch.clientX, touch.clientY);
      if (elementTouched?.tagName !== 'TD') return;
      const td = elementTouched as HTMLTableCellElement;
      const tr = td.parentElement as HTMLTableRowElement;
      const yIndex = Array.from(tr.parentElement!.children).indexOf(tr);
      const xIndex = Array.from(tr.children).indexOf(td);
      const key = getColorMapKey(xIndex, yIndex);
      setPointer({ key, isStart });
    };
    table.addEventListener('touchstart', (e) => handleTouch(e, true));
    table.addEventListener('touchmove', (e) => handleTouch(e));
    return () => {
      table.removeEventListener('touchstart', (e) => handleTouch(e, true));
      table.removeEventListener('touchmove', (e) => handleTouch(e));
    };
  }, []);

  const handleDraw = ({ key, isStart }: Pointer) => {
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
        onMouseDown: () => setPointer({ key, isStart: true }),
        onMouseMove: () => setPointer({ key }),
      })}
    />
  );
}

export default GridEditor;
