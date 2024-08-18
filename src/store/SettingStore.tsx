import { boxOption } from 'data/palette';
import { BackgroundColor, COLLAPSE_MAX, LayoutMode } from 'type/common';
import { create } from 'zustand';

interface Props {
  layoutMode: LayoutMode;
  isShowConfig: boolean;
  numOfBoxs: number;
  backgroundColor: BackgroundColor;
  setLayoutMode: (e: LayoutMode) => void;
  setIsShowConfig: (e: boolean) => void;
  setNumOfBoxs: (e: number) => void;
  setBackgroundColor: (e: BackgroundColor) => void;
}

export const useSettingStore = create<Props>((set) => ({
  layoutMode: window.innerWidth < COLLAPSE_MAX ? LayoutMode.COLLAPSE : LayoutMode.NONE,
  isShowConfig: false,
  numOfBoxs: boxOption[1],
  backgroundColor: BackgroundColor.WHITE,
  setLayoutMode: (layoutMode) => set(() => ({ layoutMode })),
  setIsShowConfig: (isShowConfig) => set(() => ({ isShowConfig })),
  setNumOfBoxs: (numOfBoxs) => set(() => ({ numOfBoxs })),
  setBackgroundColor: (backgroundColor) => set(() => ({ backgroundColor })),
}));
