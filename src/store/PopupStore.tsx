import { ModalProps } from 'component/molecule';
import { create } from 'zustand';

interface Props {
  modal: ModalProps | null;
  setModal: (e: ModalProps | null) => void;
}

export const usePopupStore = create<Props>((set) => ({
  modal: null,
  setModal: (modal) => set(() => ({ modal })),
}));
