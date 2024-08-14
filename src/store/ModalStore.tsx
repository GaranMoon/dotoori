import { ModalProps } from 'component/atom';
import { create } from 'zustand';

interface Props {
  modal: ModalProps | null;
  setModal: (e: ModalProps | null) => void;
}

export const useModalStore = create<Props>((set) => ({
  modal: null,
  setModal: (modal) => set(() => ({ modal })),
}));
