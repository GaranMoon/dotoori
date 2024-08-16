import { getClass, getColorMapKey } from 'util/common';
import styles from './Grid.module.scss';
import { useColorMapStore } from 'store/ColorMapStore';
import { useSettingStore } from 'store/SettingStore';
import { TdHTMLAttributes } from 'react';
import { CAPTURE } from 'type/common';

interface Props {
  mode?: 'preview' | 'edit';
  tdProps?: (e: string) => TdHTMLAttributes<HTMLTableCellElement>;
}

function Grid({ mode = 'preview', tdProps }: Props) {
  const { layoutMode, numOfBoxs } = useSettingStore((state) => state);
  const { colorMap } = useColorMapStore((state) => state);
  const captureId = mode === 'edit' ? CAPTURE : '';

  return (
    <div className={getClass(['container', layoutMode, mode], styles)}>
      <div id={captureId} className={styles.tableWrapper}>
        <table>
          <tbody>
            {[...Array(numOfBoxs)].map((_, _i) => (
              <tr key={_i}>
                {[...Array(numOfBoxs)].map((__, __i) => {
                  const key = getColorMapKey(_i, __i);
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
