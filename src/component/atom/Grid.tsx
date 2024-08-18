import { TdHTMLAttributes } from 'react';

import { getClass, getColorMapKey } from 'util/common';

import { useTool } from 'hook/useTool';
import { useColorMapStore } from 'store/ColorMapStore';
import { useSettingStore } from 'store/SettingStore';
import { CAPTURE, LayoutMode } from 'type/common';

import styles from './Grid.module.scss';

interface Props {
  mode?: 'preview' | 'edit';
  tdProps?: (e: string) => TdHTMLAttributes<HTMLTableCellElement>;
}

function Grid({ mode = 'preview', tdProps }: Props) {
  const { layoutMode, numOfBoxs, backgroundColor } = useSettingStore((state) => state);
  const { colorMap } = useColorMapStore((state) => state);
  const { switchBackgroundColor } = useTool();
  const isEdit = mode === 'edit';

  const handleClick = () => {
    if (isEdit || layoutMode !== LayoutMode.COLLAPSE) return;
    switchBackgroundColor();
  };

  return (
    <div className={getClass(['container', layoutMode, mode, backgroundColor], styles)} onClick={handleClick}>
      <div id={isEdit ? CAPTURE : ''} className={styles.tableWrapper}>
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
