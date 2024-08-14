import styles from './Radio.module.scss';

export interface RadioProps {
  title: string;
  selected: boolean;
  onClick: () => void;
}

function Radio({ title, selected, onClick }: RadioProps) {
  const lightStyle = `${styles.light} ${styles[selected ? 'on' : '']}`;

  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.button}>
        <div className={lightStyle}>
          <div className={styles.glow} />
        </div>
      </div>
      <div className={styles.text}>{title}</div>
    </div>
  );
}

export default Radio;
