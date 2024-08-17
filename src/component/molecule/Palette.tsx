import { getClass } from 'util/common';

import { ColorChip } from 'component/atom';
import { ToolStatus } from 'type/common';

import styles from './Palette.module.scss';

interface Props {
  color: string;
  text: string;
  status?: ToolStatus;
}

function Palette({ color, text, status }: Props) {
  return (
    <div className={styles.container}>
      <ColorChip color={color} status={status} />
      <div className={getClass(['text', status], styles)}>{text}</div>
    </div>
  );
}

export default Palette;
