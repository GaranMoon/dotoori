import { useEffect, useRef, useState } from 'react';

import { getClass } from 'util/common';

import { usePopupStore } from 'store/PopupStore';
import { POPUP_DELAY } from 'type/common';

import styles from './Toast.module.scss';

export interface ToastProps {
  message: string;
}

function Toast() {
  const toast = usePopupStore((state) => state.toast);
  const setToast = usePopupStore((state) => state.setToast);
  const [animation, setAnimation] = useState<'start' | 'end'>('start');
  const toastRef = useRef<HTMLDivElement | null>(null);

  const handleClose = () => {
    setAnimation('end');
    setTimeout(() => setToast(null), POPUP_DELAY);
  };

  useEffect(() => {
    const autoHide = setTimeout(() => handleClose(), 5000);
    return () => clearTimeout(autoHide);
  }, [handleClose]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toastRef.current && !toastRef.current.contains(event.target as Node)) handleClose();
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClose]);

  return toast ? (
    <div ref={toastRef} className={styles.container}>
      <div className={getClass(['toast', animation], styles)}>
        <pre>{toast.message}</pre>
      </div>
    </div>
  ) : null;
}

export default Toast;
