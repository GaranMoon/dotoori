import { TdHTMLAttributes, useMemo } from 'react';

import { getClass, getColorMapKey } from 'util/common';

import { useTool } from 'hook/useTool';
import { useColorMapStore } from 'store/ColorMapStore';
import { useSettingStore } from 'store/SettingStore';
import { LayoutMode, SAVE_MAX_SIZE } from 'type/common';

import styles from './Grid.module.scss';

export type GridType = 'preview' | 'edit' | 'capture';

interface Props {
  mode?: GridType;
  tdProps?: (e: string) => TdHTMLAttributes<HTMLTableCellElement>;
}

function Grid({ mode = 'preview', tdProps }: Props) {
  const { layoutMode, numOfBoxs, backgroundColor } = useSettingStore((state) => state);
  const { colorMap } = useColorMapStore((state) => state);
  const { switchBackgroundColor } = useTool();

  const captureWidth = useMemo(() => {
    return mode === 'capture' ? numOfBoxs * Math.floor(SAVE_MAX_SIZE / numOfBoxs) : '';
  }, [numOfBoxs]);

  const handleClick = () => {
    if (mode === 'edit' || layoutMode !== LayoutMode.COLLAPSE) return;
    switchBackgroundColor();
  };

  return (
    <div className={getClass(['container', layoutMode, mode, backgroundColor], styles)} onClick={handleClick}>
      <div id={mode} className={styles.tableWrapper} style={{ width: captureWidth }}>
        <table>
          <tbody>
            {[...Array(numOfBoxs)].map((_, _i) => (
              <tr key={_i}>
                {[...Array(numOfBoxs)].map((__, __i) => {
                  const key = getColorMapKey(__i, _i);
                  return (
                    <td
                      key={__i}
                      style={{ backgroundColor: colorMap[key] }}
                      {...(tdProps ? tdProps(key) : undefined)}
                    />
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Grid;
