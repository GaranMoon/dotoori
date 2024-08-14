import { Button, ButtonProps } from 'component/atom';

import styles from './ButtonGroup.module.scss';

interface Props {
  direction?: 'row' | 'column';
  buttons: ButtonProps[];
}

function ButtonGroup({ direction = 'row', buttons }: Props) {
  const containerStyle = `${styles.container} ${styles[direction]}`;

  return (
    <div className={containerStyle}>
      {buttons.map((_, _i) => (
        <Button key={_i} {..._} />
      ))}
    </div>
  );
}

export default ButtonGroup;
