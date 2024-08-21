import { getClass } from 'util/common';

import { Title } from 'component/atom';
import { GrMore, GrMoreVertical } from 'react-icons/gr';
import { useSettingStore } from 'store/SettingStore';

import styles from './Header.module.scss';

function Header() {
  const { layoutMode, isShowConfig, isShowGuide, setIsShowConfig, setIsShowGuide } = useSettingStore(
    (state) => state,
  );

  const handleClickConfigIcon = () => {
    setIsShowConfig(!isShowConfig);
  };

  const handleClickGuideIcon = () => {
    setIsShowGuide(!isShowGuide);
  };

  const renderGuideIcon = () => {
    const style = getClass(['guide', isShowGuide ? 'active' : ''], styles);
    return (
      <div className={style} onClick={handleClickGuideIcon}>
        <div>?</div>
      </div>
    );
  };

  if (!layoutMode) {
    return (
      <div className={styles.container}>
        {renderGuideIcon()}
        <Title />
      </div>
    );
  }

  return (
    <div className={getClass(['container', layoutMode], styles)}>
      {renderGuideIcon()}
      <Title />
      <div className={styles.more} onClick={handleClickConfigIcon}>
        {isShowConfig ? <GrMore /> : <GrMoreVertical />}
      </div>
    </div>
  );
}

export default Header;
