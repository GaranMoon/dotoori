import { getClass } from 'util/common';

import { Title } from 'component/atom';
import { GrMore, GrMoreVertical } from 'react-icons/gr';
import { useSettingStore } from 'store/SettingStore';

import styles from './Header.module.scss';

function Header() {
  const { layoutMode, isShowConfig, setIsShowConfig } = useSettingStore((state) => state);

  const handleShowConfig = () => {
    setIsShowConfig(!isShowConfig);
  };

  if (!layoutMode) {
    return (
      <div className={styles.container}>
        <Title />
      </div>
    );
  }

  return (
    <div className={getClass(['container', layoutMode], styles)}>
      <Title />
      <div className={styles.more} onClick={handleShowConfig}>
        {isShowConfig ? <GrMore /> : <GrMoreVertical />}
      </div>
    </div>
  );
}

export default Header;
