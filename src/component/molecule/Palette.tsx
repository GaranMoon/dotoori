import { getClass } from 'util/common';

import { ColorChip } from 'component/atom';
import { ToolStatus } from 'type/common';

import styles from './Palette.module.scss';

interface Props {
  color: string;
  text: string;
  picked: boolean;
  used: boolean;
}

function Palette({ color, text, picked, used }: Props) {
  const status = picked ? ToolStatus.PICKED : used ? ToolStatus.USED : undefined;

  return (
    <div className={styles.container}>
      <ColorChip color={color} status={status} />
      <div className={getClass(['text', status], styles)}>{text}</div>
    </div>
  );
}

export default Palette;
