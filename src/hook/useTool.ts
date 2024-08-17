import { useToolStore } from 'store/ToolStore';
import { Tool } from 'type/common';

export function useTool() {
  const { setTool, setPicker } = useToolStore((state) => state);

  const pickTool = (tool: Tool | null, color?: string) => {
    setTool(tool);
    if (tool === Tool.BRUSH && color) setPicker(color);
  };

  return { pickTool };
}
