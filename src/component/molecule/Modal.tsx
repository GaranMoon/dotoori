import { ReactNode, useState } from 'react';

import { getClass } from 'util/common';

import { ButtonProps } from 'component/atom';
import { ModalTemplate, Overlay } from 'component/molecule';
import { usePopupStore } from 'store/PopupStore';
import { POPUP_DELAY } from 'type/common';

import styles from './Modal.module.scss';

export interface ModalProps {
  key: string;
  title: 'success' | 'error' | 'warning' | 'info';
  desc?: string | ReactNode;
  actionBtn?: ButtonProps;
  cancelBtn?: ButtonProps;
}

function Modal() {
  const { modal, setModal } = usePopupStore((state) => state);
  const [animation, setAnimation] = useState<'start' | 'end'>('start');

  const handleClose = () => {
    setAnimation('end');
    setTimeout(() => setModal(null), POPUP_DELAY);
  };

  return modal ? (
    <Overlay animation={animation} onClose={handleClose}>
      <div className={getClass(['container', animation], styles)}>
        <ModalTemplate modal={modal} onClose={handleClose} />
      </div>
    </Overlay>
  ) : null;
}

export default Modal;
