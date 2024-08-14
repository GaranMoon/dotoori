import { Tool } from 'type/common';

import styles from './ColorChip.module.scss';

interface Props {
  size?: 'sm' | 'md';
  color: string;
  highlight?: Tool;
  onClick?: () => void;
}

function ColorChip({ size = 'sm', color, highlight, onClick }: Props) {
  const containerStyle = `${styles.container} ${styles[size]} ${styles[highlight || '']}`;

  return <div className={containerStyle} style={{ backgroundColor: color }} onClick={onClick} />;
}

export default ColorChip;
