import { COLLAPSE_MAX, LayoutMode } from 'type/common';
import { create } from 'zustand';

interface Props {
  layoutMode: LayoutMode;
  isShowConfig: boolean;
  numOfBoxs: number;
  setLayoutMode: (e: LayoutMode) => void;
  setIsShowConfig: (e: boolean) => void;
  setNumOfBoxs: (e: number) => void;
}

export const useSettingStore = create<Props>((set) => ({
  layoutMode: window.innerWidth < COLLAPSE_MAX ? LayoutMode.COLLAPSE : LayoutMode.NONE,
  isShowConfig: false,
  numOfBoxs: 20,
  setLayoutMode: (layoutMode) => set(() => ({ layoutMode })),
  setIsShowConfig: (isShowConfig) => set(() => ({ isShowConfig })),
  setNumOfBoxs: (numOfBoxs) => set(() => ({ numOfBoxs })),
}));
