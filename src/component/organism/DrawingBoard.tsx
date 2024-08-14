import { Frame } from 'component/atom';
import { GridEditor } from 'component/organism';

import styles from './DrawingBoard.module.scss';

function DrawingBoard() {
  return (
    <div className={styles.container}>
      <Frame width={10}>
        <GridEditor />
      </Frame>
    </div>
  );
}

export default DrawingBoard;
