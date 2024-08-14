import { ReactNode, useEffect, useState } from 'react';

import { ButtonProps, ModalTemplate } from 'component/atom';
import { useModalStore } from 'store/ModalStore';
import { MODAL_DELAY } from 'type/common';

import styles from './Modal.module.scss';

export interface ModalProps {
  key: string;
  title?: string;
  desc?: string | ReactNode;
  actionBtn?: ButtonProps;
  cancelBtn?: ButtonProps;
}

function Modal() {
  const { modal, setModal } = useModalStore((state) => state);
  const [_modal, _setModal] = useState<ModalProps | null>(null);
  const containerStyle = `${styles.container} ${styles[modal ? 'fadeIn' : 'fadeOut']}`;
  const modalStyle = `${styles.modal} ${styles[modal ? 'appear' : 'disappear']}`;

  useEffect(() => {
    if (modal) _setModal({ ...modal });
  }, [modal]);

  const handleClose = () => {
    setModal(null);
    setTimeout(() => _setModal(null), MODAL_DELAY);
  };

  return _modal ? (
    <div className={containerStyle}>
      <div className={styles.overlay} onClick={handleClose} />
      <div className={modalStyle}>
        <ModalTemplate modal={_modal} onClose={handleClose} />
      </div>
    </div>
  ) : null;
}

export default Modal;
