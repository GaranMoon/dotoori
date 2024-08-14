import acorn from 'asset/icon/acorn.png';

import styles from './Title.module.scss';

function Title() {
  return (
    <div className={styles.container}>
      <img src={acorn} />
      <div className={styles.text}>Dotoori</div>
    </div>
  );
}

export default Title;
