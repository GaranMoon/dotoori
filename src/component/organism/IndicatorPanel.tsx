import { useEffect } from 'react';

import { ColorChip, Eraser, Grid } from 'component/atom';
import { ButtonGroup } from 'component/molecule';
import { BiUndo } from 'react-icons/bi';
import { BiRedo } from 'react-icons/bi';
import { useColorMapStore } from 'store/ColorMapStore';
import { usePickerStore } from 'store/PickerStore';
import { Tool } from 'type/common';

import styles from './IndicatorPanel.module.scss';

function IndicatorPanel() {
  const { picker, isEraser, setIsEraser } = usePickerStore((state) => state);
  const { history, historyIndex, setColorMap, setHistoryIndex } = useColorMapStore((state) => state);
  const isColorPicked = !!picker && !isEraser ? Tool.PICKED : undefined;
  const isEraserPicked = isEraser ? Tool.PICKED : undefined;

  useEffect(() => {
    const handleKeyDown = (event: WindowEventMap['keydown']) => {
      if (history.length <= 1) return;
      const { key, ctrlKey, metaKey, shiftKey } = event;
      const isCtrlCmd = ctrlKey || metaKey;
      if (isCtrlCmd && key === 'z' && !shiftKey) {
        event.preventDefault();
        handleUndo();
        return;
      }
      if (isCtrlCmd && ((key === 'z' && shiftKey) || key === 'y')) {
        event.preventDefault();
        handleRedo();
        return;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historyIndex]);

  const handleUndo = () => {
    if (historyIndex <= 0) return;
    const newIndex = historyIndex - 1;
    setColorMap({ ...history[newIndex] });
    setHistoryIndex(newIndex);
  };

  const handleRedo = () => {
    const lastIndex = history.length - 1;
    if (historyIndex >= lastIndex) return;
    const newIndex = historyIndex + 1;
    setColorMap({ ...history[newIndex] });
    setHistoryIndex(newIndex);
  };

  const handleEraser = (isActivate: boolean) => {
    if (!picker) return;
    setIsEraser(isActivate);
  };

  return (
    <div className={styles.container}>
      <div className={styles.indicator}>
        <Grid />
      </div>
      <div className={styles.indicator}>
        <ColorChip size="md" color={picker} highlight={isColorPicked} onClick={() => handleEraser(false)} />
      </div>
      <div className={styles.indicator}>
        <Eraser highlight={isEraserPicked} onClick={() => handleEraser(true)} />
      </div>
      <ButtonGroup
        buttons={[
          {
            title: <BiUndo />,
            size: 'sm',
            disabled: !historyIndex,
            onClick: handleUndo,
          },
          {
            title: <BiRedo />,
            size: 'sm',
            disabled: historyIndex === history.length - 1,
            onClick: handleRedo,
          },
        ]}
      />
    </div>
  );
}

export default IndicatorPanel;
