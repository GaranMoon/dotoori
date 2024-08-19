import { getClass } from 'util/common';

import { Adsense, Button, ColorChip, Eraser, Grid } from 'component/atom';
import { ArrowButtonSet } from 'component/organism';
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

  const renderButton = (size: 'sm' | 'md', direction: 'undo' | 'redo') => {
    return direction === 'undo' ? (
      <Button title={<BiUndo />} size={size} disabled={!historyIndex} onClick={undo} />
    ) : (
      <Button title={<BiRedo />} size={size} disabled={historyIndex === history.length - 1} onClick={redo} />
    );
  };

  return layoutMode !== LayoutMode.COLLAPSE ? (
    <div className={styles.container}>
      <div className={styles.squareGroup}>
        {renderGrid()}
        {renderColorChop()}
        {renderEraser()}
      </div>
      <div className={styles.arrow}>
        <ArrowButtonSet />
      </div>
      {renderButton('md', 'undo')}
      <div className={styles.ad}>
        <Adsense type="vertical" />
      </div>
    </div>
  ) : (
    <div className={getClass(['container', layoutMode], styles)}>
      {renderButton('sm', 'undo')}
      {renderColorChop()}
      {renderGrid()}
      {renderEraser()}
      {renderButton('sm', 'redo')}
    </div>
  );
}

export default IndicatorPanel;
