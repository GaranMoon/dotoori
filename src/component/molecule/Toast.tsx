import { useEffect, useState } from 'react';

import { getClass } from 'util/common';

import { usePopupStore } from 'store/PopupStore';
import { POPUP_DELAY } from 'type/common';

import styles from './Toast.module.scss';

export interface ToastProps {
  message: string;
}

function Toast() {
  const { toast, setToast } = usePopupStore((state) => state);
  const [animation, setAnimation] = useState<'start' | 'end'>('start');

  const handleClose = () => {
    setAnimation('end');
    setTimeout(() => setToast(null), POPUP_DELAY);
  };

  useEffect(() => {
    const autoHide = setTimeout(() => handleClose(), 5000);
    return () => clearTimeout(autoHide);
  }, [handleClose]);

  return toast ? (
    <div id="toast" className={styles.container} onClick={handleClose}>
      <div className={getClass(['toast', animation], styles)}>
        <pre>{toast.message}</pre>
      </div>
    </div>
  ) : null;
}

export default Toast;
