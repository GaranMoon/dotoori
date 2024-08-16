import { getClass } from 'util/common';

import { Button, ButtonProps } from 'component/atom';

import styles from './ButtonGroup.module.scss';

interface Props {
  direction?: 'row' | 'column';
  buttons: ButtonProps[];
}

function ButtonGroup({ direction = 'row', buttons }: Props) {
  return (
    <div className={getClass(['container', direction], styles)}>
      {buttons.map((_, _i) => (
        <Button key={_i} {..._} />
      ))}
    </div>
  );
}

export default ButtonGroup;
