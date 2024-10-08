import { getClass } from 'util/common';

import { ToolStatus } from 'type/common';

import styles from './ColorChip.module.scss';

interface Props {
  size?: 'sm' | 'md' | 'lg';
  color: string;
  status?: ToolStatus;
  onClick?: () => void;
}

function ColorChip({ size = 'sm', color, status, onClick }: Props) {
  return (
    <div
      className={getClass(['container', size, status], styles)}
      style={{ backgroundColor: color }}
      onClick={onClick}
    />
  );
}

export default ColorChip;
