import { Button } from 'component/atom';
import { ModalProps } from 'component/molecule';

import styles from './ModalTemplate.module.scss';

interface Props {
  modal: ModalProps;
  onClose: () => void;
}

function ModalTemplate({ modal, onClose }: Props) {
  const { title, desc, actionBtn, cancelBtn } = modal;

  const handleAction = () => {
    if (actionBtn?.onClick) actionBtn.onClick();
    onClose();
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.contents}>
        <div className={styles.desc}>{desc}</div>
        <div className={styles.button}>
          {actionBtn && <Button {...actionBtn} onClick={handleAction} />}
          {cancelBtn && <Button {...cancelBtn} onClick={onClose} />}
        </div>
      </div>
    </div>
  );
}

export default ModalTemplate;
