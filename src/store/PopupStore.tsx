import { ModalProps, ToastProps } from 'component/molecule';
import { create } from 'zustand';

interface Props {
  toast: ToastProps | null;
  modal: ModalProps | null;
  setToast: (e: ToastProps | null) => void;
  setModal: (e: ModalProps | null) => void;
}

export const usePopupStore = create<Props>((set) => ({
  toast: null,
  modal: null,
  setToast: (toast) => set(() => ({ toast })),
  setModal: (modal) => set(() => ({ modal })),
}));
