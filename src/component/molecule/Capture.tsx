import { useMemo } from 'react';

import { getColorMapKey } from 'util/common';

import { useColorMapStore } from 'store/ColorMapStore';
import { useSettingStore } from 'store/SettingStore';
import { SAVE_MAX_SIZE } from 'type/common';

import styles from './Capture.module.scss';

function Capture() {
  const { colorMap } = useColorMapStore((state) => state);
  const { numOfBoxs } = useSettingStore((state) => state);

  const { boxStyle, containerStyle } = useMemo(() => {
    const boxSize = Math.floor(SAVE_MAX_SIZE / numOfBoxs);
    const containerSize = boxSize * numOfBoxs;
    return {
      boxStyle: { width: boxSize, height: boxSize },
      containerStyle: { width: containerSize, height: containerSize },
    };
  }, [numOfBoxs]);

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
    </div>
  );
}

export default Capture;
