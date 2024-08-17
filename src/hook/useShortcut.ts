import { useEffect } from 'react';

import { useColorMapStore } from 'store/ColorMapStore';

import { useMapHistory } from './useMapHistory';

export default function useShortcut() {
  const { undo, redo } = useMapHistory();
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
        //.
        console.log('ArrowUp');
        break;
      case 'ArrowDown':
        //.
        console.log('ArrowDown');
        break;
      case 'ArrowRight':
        //.
        console.log('ArrowRight');
        break;
      case 'ArrowLeft':
        //.
        console.log('ArrowLeft');
        break;
      case 'b':
        //.
        console.log('b');
        break;
      case 'e':
        //.
        console.log('e');
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
        //.
        console.log('Escape');
        break;
      default:
    }
  };
}
