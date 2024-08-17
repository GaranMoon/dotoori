import { Tool } from 'type/common';
import { create } from 'zustand';

interface Props {
  tool: Tool | null;
  picker: string;
  isOn: boolean;
  setTool: (e: Tool | null) => void;
  setPicker: (e: string) => void;
  setIsOn: (e: boolean) => void;
}

export const useToolStore = create<Props>((set) => ({
  tool: null,
  picker: '',
  isOn: false,
  setTool: (tool) => set(() => ({ tool })),
  setPicker: (picker) => set(() => ({ picker })),
  setIsOn: (isOn) => set(() => ({ isOn })),
}));
