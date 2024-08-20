import { ReactNode, useEffect, useState } from 'react';

import { getClass } from 'util/common';

import { ButtonProps, ModalTemplate } from 'component/atom';
import { useModalStore } from 'store/ModalStore';
import { MODAL_DELAY } from 'type/common';

import styles from './Modal.module.scss';

export interface ModalProps {
  key: string;
  title: 'success' | 'error' | 'warning' | 'info';
  desc?: string | ReactNode;
  actionBtn?: ButtonProps;
  cancelBtn?: ButtonProps;
}

function Modal() {
  const { modal, setModal } = useModalStore((state) => state);
  const [_modal, _setModal] = useState<ModalProps | null>(null);

  useEffect(() => {
    if (modal) _setModal({ ...modal });
  }, [modal]);

  const handleClose = () => {
    setModal(null);
    setTimeout(() => _setModal(null), MODAL_DELAY);
  };

  return _modal ? (
    <div className={getClass(['container', modal ? 'fadeIn' : 'fadeOut'], styles)}>
      <div className={styles.wrapper}>
        <div className={styles.overlay} onClick={handleClose} />
        <div className={getClass(['modal', modal ? 'appear' : 'disappear'], styles)}>
          <ModalTemplate modal={_modal} onClose={handleClose} />
        </div>
      </div>
      {/* <div className={styles.ad}>
        <Adsense type="overlay" />
      </div> */}
    </div>
  ) : null;
}

export default Modal;
