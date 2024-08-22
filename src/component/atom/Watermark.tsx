import styles from './Watermark.module.scss';

interface Props {
  color: string;
}

function Watermark({ color }: Props) {
  return (
    <div className={styles.container} style={{ color }}>
      @ dotoori.lol
    </div>
  );
}

export default Watermark;
