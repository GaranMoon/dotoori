import { useEffect } from 'react';

import { useColorMapStore } from 'store/ColorMapStore';
import { Tool } from 'type/common';

import { useMapHistory } from './useMapHistory';
import { usePopup } from './usePopup';
import { useTool } from './useTool';

export default function useShortcut() {
  const { pickTool, moveDrawing } = useTool();
  const { undo, redo } = useMapHistory();
  const { closeModal } = usePopup();
  const history = useColorMapStore((state) => state.history);
  const historyIndex = useColorMapStore((state) => state.historyIndex);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historyIndex, closeModal]);

  const handleKeyDown = (event: WindowEventMap['keydown']) => {
    const { key, ctrlKey, metaKey, shiftKey } = event;
    const isCommand = ctrlKey || metaKey;
    const isEmptyHistory = history.length <= 1;
    switch (key) {
      case 'ArrowUp':
        event.preventDefault();
        moveDrawing('up');
        break;
      case 'ArrowDown':
        event.preventDefault();
        moveDrawing('down');
        break;
      case 'ArrowRight':
        event.preventDefault();
        moveDrawing('right');
        break;
      case 'ArrowLeft':
        event.preventDefault();
        moveDrawing('left');
        break;
      case 'b':
      case 'ㅠ':
        event.preventDefault();
        pickTool(Tool.BRUSH);
        break;
      case 'e':
      case 'ㄷ':
        event.preventDefault();
        pickTool(Tool.ERASER);
        break;
      case 'y':
        if (isEmptyHistory || !isCommand) return;
        event.preventDefault();
        redo();
        break;
      case 'z':
        if (isEmptyHistory || !isCommand) return;
        event.preventDefault();
        shiftKey ? redo() : undo();
        break;
      case 'Escape':
        event.preventDefault();
        closeModal();
        break;
      default:
    }
  };
}
