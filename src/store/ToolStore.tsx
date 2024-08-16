import { create } from 'zustand';

interface Props {
  picker: string;
  isEraser: boolean;
  isDrawing: boolean;
  setPicker: (e: string) => void;
  setIsEraser: (e: boolean) => void;
  setIsDrawing: (e: boolean) => void;
}

export const useToolStore = create<Props>((set) => ({
  picker: '',
  isEraser: false,
  isDrawing: false,
  setPicker: (picker) => set(() => ({ picker })),
  setIsEraser: (isEraser) => set(() => ({ isEraser })),
  setIsDrawing: (isDrawing) => set(() => ({ isDrawing })),
}));
