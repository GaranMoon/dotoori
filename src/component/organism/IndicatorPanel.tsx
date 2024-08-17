import { getClass } from 'util/common';

import { Button, ButtonProps, ColorChip, Eraser, Grid } from 'component/atom';
import { ButtonGroup } from 'component/molecule';
import { useMapHistory } from 'hook/useMapHistory';
import { useTool } from 'hook/useTool';
import { BiUndo } from 'react-icons/bi';
import { BiRedo } from 'react-icons/bi';
import { useColorMapStore } from 'store/ColorMapStore';
import { useSettingStore } from 'store/SettingStore';
import { useToolStore } from 'store/ToolStore';
import { LayoutMode, Tool, ToolStatus } from 'type/common';

import styles from './IndicatorPanel.module.scss';

function IndicatorPanel() {
  const { undo, redo } = useMapHistory();
  const { pickTool } = useTool();
  const { layoutMode } = useSettingStore((state) => state);
  const { tool, picker } = useToolStore((state) => state);
  const { history, historyIndex } = useColorMapStore((state) => state);
  const squareSize = layoutMode === LayoutMode.COLLAPSE ? 'md' : 'lg';

  const getButtonProps = (direction?: 'undo' | 'redo'): ButtonProps => {
    return direction === 'undo'
      ? { title: <BiUndo />, size: 'sm', disabled: !historyIndex, onClick: undo }
      : { title: <BiRedo />, size: 'sm', disabled: historyIndex === history.length - 1, onClick: redo };
  };

  const renderGrid = () => {
    return (
      <div className={styles.square}>
        <Grid />
      </div>
    );
  };

  const renderColorChop = () => {
    return (
      <div className={styles.square}>
        <ColorChip
          size={squareSize}
          color={picker}
          status={tool === Tool.BRUSH ? ToolStatus.PICKED : undefined}
          onClick={() => pickTool(Tool.BRUSH)}
        />
      </div>
    );
  };

  const renderEraser = () => {
    return (
      <div className={styles.square}>
        <Eraser
          size={squareSize}
          status={tool === Tool.ERASER ? ToolStatus.PICKED : undefined}
          onClick={() => pickTool(Tool.ERASER)}
        />
      </div>
    );
  };

  return layoutMode !== LayoutMode.COLLAPSE ? (
    <div className={styles.container}>
      {renderGrid()}
      {renderColorChop()}
      {renderEraser()}
      <ButtonGroup buttons={[getButtonProps('undo'), getButtonProps('redo')]} />
    </div>
  ) : (
    <div className={getClass(['container', layoutMode], styles)}>
      <Button {...getButtonProps('undo')} />
      {renderColorChop()}
      {renderGrid()}
      {renderEraser()}
      <Button {...getButtonProps('redo')} />
    </div>
  );
}

export default IndicatorPanel;
