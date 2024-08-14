import { Radio, RadioProps } from 'component/atom';

import styles from './RadioGroup.module.scss';

interface Props {
  radios: RadioProps[];
}

function RadioGroup({ radios }: Props) {
  return (
    <div className={styles.container}>
      {radios.map((_, _i) => (
        <Radio key={_i} {..._} />
      ))}
    </div>
  );
}

export default RadioGroup;
