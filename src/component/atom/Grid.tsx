import { TdHTMLAttributes } from 'react';

import { getClass, getColorMapKey } from 'util/common';

import { useTool } from 'hook/useTool';
import { useColorMapStore } from 'store/ColorMapStore';
import { useSettingStore } from 'store/SettingStore';

import styles from './Grid.module.scss';

export type GridType = 'preview' | 'edit';

interface Props {
  mode?: GridType;
  tdProps?: (e: string) => TdHTMLAttributes<HTMLTableCellElement>;
}

function Grid({ mode = 'preview', tdProps }: Props) {
  const layoutMode = useSettingStore((state) => state.layoutMode);
  const numOfBoxs = useSettingStore((state) => state.numOfBoxs);
  const backgroundColor = useSettingStore((state) => state.backgroundColor);
  const colorMap = useColorMapStore((state) => state.colorMap);
  const { switchBackgroundColor } = useTool();

  const handleClick = () => {
    if (mode === 'edit' || !layoutMode) return;
    switchBackgroundColor();
  };

  return (
    <div className={getClass(['container', layoutMode, mode, backgroundColor], styles)} onClick={handleClick}>
      <div className={styles.tableWrapper}>
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
