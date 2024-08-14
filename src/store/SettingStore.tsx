import { create } from 'zustand';

interface Props {
  numOfBoxs: number;
  setNumOfBoxs: (e: number) => void;
}

export const useSettingStore = create<Props>((set) => ({
  numOfBoxs: 20,
  setNumOfBoxs: (numOfBoxs) => set(() => ({ numOfBoxs })),
}));
