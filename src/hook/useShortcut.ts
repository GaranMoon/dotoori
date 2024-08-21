import { useEffect } from 'react';

import { useColorMapStore } from 'store/ColorMapStore';
import { usePopupStore } from 'store/PopupStore';
import { Tool } from 'type/common';

import { useMapHistory } from './useMapHistory';
import { useTool } from './useTool';

export default function useShortcut() {
  const { pickTool, moveDrawing } = useTool();
  const { undo, redo } = useMapHistory();
  const { setModal } = usePopupStore((state) => state);
  const { history, historyIndex } = useColorMapStore((state) => state);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historyIndex]);

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
        setModal(null);
        break;
      default:
    }
  };
}
