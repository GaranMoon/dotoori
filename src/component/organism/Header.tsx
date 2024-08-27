import { getClass } from 'util/common';

import { Title } from 'component/atom';
import { GrMore, GrMoreVertical } from 'react-icons/gr';
import { RiQuestionnaireLine } from 'react-icons/ri';
import { useSettingStore } from 'store/SettingStore';

import styles from './Header.module.scss';

function Header() {
  const { layoutMode, isShowConfig, setIsShowConfig } = useSettingStore((state) => state);

  const handleClickConfigIcon = () => {
    setIsShowConfig(!isShowConfig);
  };

  if (!layoutMode) {
    return (
      <div className={styles.container}>
        <GuideIcon />
        <Title />
      </div>
    );
  }

  return (
    <div className={getClass(['container', layoutMode], styles)}>
      <GuideIcon />
      <Title />
      <div className={styles.more} onClick={handleClickConfigIcon}>
        {isShowConfig ? <GrMore /> : <GrMoreVertical />}
      </div>
    </div>
  );
}

export default Header;

function GuideIcon() {
  const { isShowGuide, setIsShowGuide } = useSettingStore((state) => state);
  const style = getClass(['guide', isShowGuide ? 'active' : ''], styles);

  return (
    <div className={style} onClick={() => setIsShowGuide(!isShowGuide)}>
      <RiQuestionnaireLine />
    </div>
  );
}
