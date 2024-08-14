import { getColorMapKey } from 'util/common';
import styles from './Grid.module.scss';
import { useColorMapStore } from 'store/ColorMapStore';
import { useSettingStore } from 'store/SettingStore';
import { TdHTMLAttributes } from 'react';

interface Props {
  mode?: 'edit';
  tdProps?: (e: string) => TdHTMLAttributes<HTMLTableCellElement>;
}

function Grid({ mode, tdProps }: Props) {
  const { numOfBoxs } = useSettingStore((state) => state);
  const { colorMap } = useColorMapStore((state) => state);
  const containerStyle = mode ? styles.editorContainer : styles.container;

  return (
    <div className={containerStyle}>
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
  );
}

export default Grid;
