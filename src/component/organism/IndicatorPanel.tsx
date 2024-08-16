import { useEffect } from 'react';

import { getClass } from 'util/common';

import { Button, ButtonProps, ColorChip, Eraser, Grid } from 'component/atom';
import { ButtonGroup } from 'component/molecule';
import { BiUndo } from 'react-icons/bi';
import { BiRedo } from 'react-icons/bi';
import { useColorMapStore } from 'store/ColorMapStore';
import { usePickerStore } from 'store/PickerStore';
import { useSettingStore } from 'store/SettingStore';
import { LayoutMode, Tool } from 'type/common';

import styles from './IndicatorPanel.module.scss';

function IndicatorPanel() {
  const { layoutMode } = useSettingStore((state) => state);
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

  const getButtonProps = (direction?: 'undo' | 'redo'): ButtonProps => {
    return direction === 'undo'
      ? { title: <BiUndo />, size: 'sm', disabled: !historyIndex, onClick: handleUndo }
      : { title: <BiRedo />, size: 'sm', disabled: historyIndex === history.length - 1, onClick: handleRedo };
  };

  const renderGrid = () => {
    return (
      <div className={styles.square}>
        <Grid />
      </div>
    );
  };

  const renderColorChop = (size: 'md' | 'lg') => {
    return (
      <div className={styles.square}>
        <ColorChip size={size} color={picker} highlight={isColorPicked} onClick={() => handleEraser(false)} />
      </div>
    );
  };

  const renderEraser = () => {
    return (
      <div className={styles.square}>
        <Eraser highlight={isEraserPicked} onClick={() => handleEraser(true)} />
      </div>
    );
  };

  return layoutMode !== LayoutMode.COLLAPSE ? (
    <div className={styles.container}>
      {renderGrid()}
      {renderColorChop('lg')}
      {renderEraser()}
      <ButtonGroup buttons={[getButtonProps('undo'), getButtonProps('redo')]} />
    </div>
  ) : (
    <div className={getClass(['container', layoutMode], styles)}>
      <Button {...getButtonProps('undo')} />
      {renderColorChop('md')}
      {renderGrid()}
      {renderEraser()}
      <Button {...getButtonProps('redo')} />
    </div>
  );
}

export default IndicatorPanel;
