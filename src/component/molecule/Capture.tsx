import { useMemo } from 'react';

import { getColorMapKey } from 'util/common';

import chroma from 'chroma-js';
import { Watermark } from 'component/atom';
import { useColorMapStore } from 'store/ColorMapStore';
import { useSettingStore } from 'store/SettingStore';
import { BackgroundColor, SAVE_MAX_SIZE } from 'type/common';

import styles from './Capture.module.scss';

function Capture() {
  const { colorMap } = useColorMapStore((state) => state);
  const { numOfBoxs, backgroundColor } = useSettingStore((state) => state);

  const { boxStyle, containerStyle } = useMemo(() => {
    const boxSize = Math.floor(SAVE_MAX_SIZE / numOfBoxs);
    const containerSize = boxSize * numOfBoxs;
    return {
      boxStyle: { width: boxSize, height: boxSize },
      containerStyle: { width: containerSize, height: containerSize },
    };
  }, [numOfBoxs]);

  const getInvertedColor = () => {
    const targetBoxs = Math.ceil(numOfBoxs / 5) + 1;
    const colors: string[] = [];
    for (let i = numOfBoxs; i > numOfBoxs - targetBoxs; i--) {
      const key = getColorMapKey(i - 1, numOfBoxs - 1);
      const color = colorMap[key] || (backgroundColor === BackgroundColor.BLACK ? '#000000' : '#ffffff');
      colors.push(color);
    }
    const averageColor = chroma.average(colors).hex();
    const invertedColor = chroma(
      255 - chroma(averageColor).get('rgb.r'),
      255 - chroma(averageColor).get('rgb.g'),
      255 - chroma(averageColor).get('rgb.b'),
    ).hex();
    return invertedColor;
  };

  return (
    <div id="capture" className={styles.container} style={containerStyle}>
      {[...Array(numOfBoxs)].map((_, _i) => (
        <div key={_i} className={styles.row} style={boxStyle}>
          {[...Array(numOfBoxs)].map((__, __i) => {
            const key = getColorMapKey(_i, __i);
            return (
              <div
                key={__i}
                className={styles.column}
                style={{ ...boxStyle, backgroundColor: colorMap[key] }}
              />
            );
          })}
        </div>
      ))}
      <div className={styles.watermark}>
        <Watermark color={getInvertedColor()} />
      </div>
    </div>
  );
}

export default Capture;
