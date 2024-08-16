import { Color } from 'type/common';
import { create } from 'zustand';

interface Props {
  colorMap: Color;
  history: Color[];
  historyIndex: number;
  setColorMap: (e: Color) => void;
  setHistory: (e: Color[]) => void;
  setHistoryIndex: (e: number) => void;
}

export const useColorMapStore = create<Props>((set) => ({
  colorMap: {},
  history: [{}],
  historyIndex: 0,
  setColorMap: (colorMap) => set(() => ({ colorMap })),
  setHistory: (history) => set(() => ({ history })),
  setHistoryIndex: (historyIndex) => set(() => ({ historyIndex })),
}));
