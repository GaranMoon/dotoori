import { ReactNode } from 'react';

import { getClass } from 'util/common';

import { FaChevronLeft } from 'react-icons/fa6';
import { useSettingStore } from 'store/SettingStore';

import styles from './ArrowButton.module.scss';

interface Props {
  size?: 'sm' | 'lg';
  direction: 'up' | 'down' | 'left' | 'right' | 'center';
  icon?: ReactNode;
  onClick: () => void;
}

function ArrowButton({ size = 'lg', direction, icon = <FaChevronLeft />, onClick }: Props) {
  const { backgroundColor } = useSettingStore((state) => state);

  return (
    <div className={getClass(['container', direction, size], styles)} onClick={onClick}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles[backgroundColor]}></div>
    </div>
  );
}

export default ArrowButton;
