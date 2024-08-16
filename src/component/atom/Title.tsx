import { getClass } from 'util/common';

import acorn from 'asset/icon/acorn.png';
import { useSettingStore } from 'store/SettingStore';

import styles from './Title.module.scss';

function Title() {
  const { layoutMode } = useSettingStore((state) => state);

  return (
    <div className={getClass(['container', layoutMode], styles)}>
      <img src={acorn} />
      <div className={styles.text}>Dotoori</div>
    </div>
  );
}

export default Title;
