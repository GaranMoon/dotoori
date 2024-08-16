import { getClass } from 'util/common';

import { Tool } from 'type/common';

import styles from './ColorChip.module.scss';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  color: string;
  highlight?: Tool;
  onClick?: () => void;
}

function ColorChip({ size = 'sm', color, highlight, onClick }: Props) {
  return (
    <div
      className={getClass(['container', size, highlight], styles)}
      style={{ backgroundColor: color }}
      onClick={onClick}
    />
  );
}

export default ColorChip;
