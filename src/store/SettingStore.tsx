import { COLLAPSE_MAX, LayoutMode } from 'type/common';
import { create } from 'zustand';

interface Props {
  layoutMode: LayoutMode;
  numOfBoxs: number;
  setLayoutMode: (e: LayoutMode) => void;
  setNumOfBoxs: (e: number) => void;
}

export const useSettingStore = create<Props>((set) => ({
  layoutMode: window.innerWidth < COLLAPSE_MAX ? LayoutMode.COLLAPSE : LayoutMode.NONE,
  numOfBoxs: 20,
  setLayoutMode: (layoutMode) => set(() => ({ layoutMode })),
  setNumOfBoxs: (numOfBoxs) => set(() => ({ numOfBoxs })),
}));
