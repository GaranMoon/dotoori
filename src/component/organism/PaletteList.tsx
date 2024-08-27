import { memo, useEffect, useState } from 'react';

import { cutWords } from 'util/common';

import { Palette } from 'component/molecule';
import { colorData } from 'data/palette';
import { useLayout } from 'hook/useLayout';
import { useTool } from 'hook/useTool';
import { useColorMapStore } from 'store/ColorMapStore';
import { useToolStore } from 'store/ToolStore';
import { Tool, ToolStatus } from 'type/common';

import styles from './PaletteList.module.scss';

type Color = [string, string];
const colorList: Color[] = Object.entries(colorData);

function PaletteList() {
  const { pickTool } = useTool();
  const { screenWidth } = useLayout();
  const [splitList, setSplitList] = useState<Color[][]>([]);
  const [usedColors, setUsedColors] = useState<string[]>([]);
  const tool = useToolStore((state) => state.tool);
  const picker = useToolStore((state) => state.picker);
  const colorMap = useColorMapStore((state) => state.colorMap);
  const historyIndex = useColorMapStore((state) => state.historyIndex);

  useEffect(() => {
    setSplitList(getSplitList(screenWidth));
  }, [screenWidth]);

  useEffect(() => {
    setUsedColors(Object.values(colorMap));
  }, [historyIndex]);

  return (
    <div className={styles.container}>
      {splitList.map((_, _i) => (
        <div key={_i} className={styles.column}>
          {_.map((__, __i) => {
            const [text, color] = __;
            const status =
              tool === Tool.BRUSH && color === picker
                ? ToolStatus.PICKED
                : usedColors.includes(color)
                  ? ToolStatus.USED
                  : undefined;
            return (
              <div key={__i} onClick={() => pickTool(Tool.BRUSH, color)}>
                <Palette color={color} text={cutWords(text)} status={status} />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default memo(PaletteList);

const getSplitList = (screenWidth: number) => {
  const result = [];
  const totalCount = colorList.length;
  const columnCount = Math.floor(screenWidth / 170);
  const rowCount = Math.ceil(totalCount / columnCount);
  for (let i = 0; i < totalCount; i += rowCount) {
    result.push(colorList.slice(i, i + rowCount));
  }
  return result;
};
