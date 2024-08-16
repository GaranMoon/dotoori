import { useEffect, useState } from 'react';

import { cutWords } from 'util/common';

import { Palette } from 'component/molecule';
import { colorData } from 'data/palette';
import { useColorMapStore } from 'store/ColorMapStore';
import { useSettingStore } from 'store/SettingStore';
import { useToolStore } from 'store/ToolStore';
import { COLLAPSE_MAX, LayoutMode } from 'type/common';

import styles from './PaletteList.module.scss';

type Color = [string, string];
const colorList: Color[] = Object.entries(colorData);

function PaletteList() {
  const [splitList, setSplitList] = useState<Color[][]>([]);
  const [usedColors, setUsedColors] = useState<string[]>([]);
  const { picker, isEraser, isDrawing, setPicker, setIsEraser } = useToolStore((state) => state);
  const { colorMap } = useColorMapStore((state) => state);
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const { layoutMode, setLayoutMode, setIsShowConfig } = useSettingStore((state) => state);
  const isCollapseMode = layoutMode === LayoutMode.COLLAPSE;

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setSplitList(getSplitList(screenWidth));
    if (screenWidth < COLLAPSE_MAX) {
      if (!isCollapseMode) setLayoutMode(LayoutMode.COLLAPSE);
      return;
    }
    if (isCollapseMode) {
      setLayoutMode(LayoutMode.NONE);
      setIsShowConfig(false);
    }
  }, [screenWidth]);

  useEffect(() => {
    if (!isDrawing) setUsedColors(Object.values(colorMap));
  }, [colorMap, isDrawing]);

  const handlePickColor = (color: string) => {
    if (isEraser) setIsEraser(false);
    setPicker(color);
  };

  return (
    <div className={styles.container}>
      {splitList.map((_, _i) => (
        <div key={_i} className={styles.column}>
          {_.map((__, __i) => {
            const [text, color] = __;
            const picked = !isEraser && color === picker;
            const used = usedColors.includes(color);
            return (
              <div key={__i} onClick={() => handlePickColor(color)}>
                <Palette color={color} text={cutWords(text)} picked={picked} used={used} />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default PaletteList;

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
