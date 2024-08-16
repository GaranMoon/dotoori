import { getClass } from 'util/common';

import { Title } from 'component/atom';
import { GrMore, GrMoreVertical } from 'react-icons/gr';
import { useSettingStore } from 'store/SettingStore';
import { LayoutMode } from 'type/common';

import styles from './Header.module.scss';

function Header() {
  const { layoutMode, isShowConfig, setIsShowConfig } = useSettingStore((state) => state);

  const handleShowConfig = () => {
    setIsShowConfig(!isShowConfig);
  };

  return layoutMode !== LayoutMode.COLLAPSE ? (
    <div className={styles.container}>
      <Title />
    </div>
  ) : (
    <div className={getClass(['container', layoutMode], styles)}>
      <Title />
      <div className={styles.more} onClick={handleShowConfig}>
        {isShowConfig ? <GrMore /> : <GrMoreVertical />}
      </div>
    </div>
  );
}

export default Header;
