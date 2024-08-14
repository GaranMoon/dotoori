import { Title } from 'component/atom';

import styles from './Header.module.scss';

function Header() {
  return (
    <div className={styles.container}>
      <Title />
    </div>
  );
}

export default Header;
