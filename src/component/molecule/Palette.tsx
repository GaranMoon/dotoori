import { ColorChip } from 'component/atom';
import { Tool } from 'type/common';

import styles from './Palette.module.scss';

interface Props {
  color: string;
  text: string;
  picked: boolean;
  used: boolean;
}

function Palette({ color, text, picked, used }: Props) {
  const highlight = picked ? Tool.PICKED : used ? Tool.USED : undefined;
  const textStyle = `${styles.text} ${styles[highlight || '']}`;

  return (
    <div className={styles.container}>
      <ColorChip color={color} highlight={highlight} />
      <div className={textStyle}>{text}</div>
    </div>
  );
}

export default Palette;
