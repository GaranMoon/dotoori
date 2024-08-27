import { getClass } from 'util/common';

import { Title } from 'component/atom';
import { GrMore, GrMoreVertical } from 'react-icons/gr';
import { RiQuestionnaireLine } from 'react-icons/ri';
import { useSettingStore } from 'store/SettingStore';

import styles from './Header.module.scss';

function Header() {
  const layoutMode = useSettingStore((state) => state.layoutMode);
  const isShowConfig = useSettingStore((state) => state.isShowConfig);
  const setIsShowConfig = useSettingStore((state) => state.setIsShowConfig);

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
  const isShowGuide = useSettingStore((state) => state.isShowGuide);
  const setIsShowGuide = useSettingStore((state) => state.setIsShowGuide);
  const style = getClass(['guide', isShowGuide ? 'active' : ''], styles);

  return (
    <div className={style} onClick={() => setIsShowGuide(!isShowGuide)}>
      <RiQuestionnaireLine />
    </div>
  );
}
