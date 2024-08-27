import { getClass } from 'util/common';

import { Adsense, Button, ColorChip, Eraser, Grid } from 'component/atom';
import { GuideBox } from 'component/molecule';
import { ArrowButtonSet } from 'component/organism';
import { useMapHistory } from 'hook/useMapHistory';
import { useTool } from 'hook/useTool';
import { BiRedo, BiUndo } from 'react-icons/bi';
import { useColorMapStore } from 'store/ColorMapStore';
import { useSettingStore } from 'store/SettingStore';
import { useToolStore } from 'store/ToolStore';
import { Tool, ToolStatus } from 'type/common';

import styles from './IndicatorPanel.module.scss';

function IndicatorPanel() {
  const layoutMode = useSettingStore((state) => state.layoutMode);
  const squareSize = !layoutMode ? 'lg' : 'md';

  if (!layoutMode) {
    return (
      <div className={styles.container}>
        <div className={styles.squareGroup}>
          <PreviewSquare />
          <PickerSquare size={squareSize} />
          <EraserSquare size={squareSize} />
        </div>
        <div className={styles.arrow}>
          <ArrowButtonSet />
        </div>
        <HistoryButton size="md" direction="undo" />
        <div className={styles.ad}>
          <Adsense type="vertical" />
        </div>
      </div>
    );
  }

  return (
    <div className={getClass(['container', layoutMode], styles)}>
      <HistoryButton size="sm" direction="undo" />
      <PickerSquare size={squareSize} />
      <PreviewSquare />
      <EraserSquare size={squareSize} />
      <HistoryButton size="sm" direction="redo" />
    </div>
  );
}

export default IndicatorPanel;

function PreviewSquare() {
  return (
    <div className={styles.square}>
      <GuideBox guideKey="preview">
        <Grid />
      </GuideBox>
    </div>
  );
}

function PickerSquare({ size }: { size: 'md' | 'lg' }) {
  const { pickTool } = useTool();
  const tool = useToolStore((state) => state.tool);
  const picker = useToolStore((state) => state.picker);

  return (
    <div className={styles.square}>
      <GuideBox guideKey="picker">
        <ColorChip
          size={size}
          color={picker}
          status={tool === Tool.BRUSH ? ToolStatus.PICKED : undefined}
          onClick={() => pickTool(Tool.BRUSH)}
        />
      </GuideBox>
    </div>
  );
}

function EraserSquare({ size }: { size: 'md' | 'lg' }) {
  const { pickTool } = useTool();
  const tool = useToolStore((state) => state.tool);

  return (
    <div className={styles.square}>
      <GuideBox guideKey="eraser">
        <Eraser
          size={size}
          status={tool === Tool.ERASER ? ToolStatus.PICKED : undefined}
          onClick={() => pickTool(Tool.ERASER)}
        />
      </GuideBox>
    </div>
  );
}

function HistoryButton({ size, direction }: { size: 'sm' | 'md'; direction: 'undo' | 'redo' }) {
  const { undo, redo } = useMapHistory();
  const history = useColorMapStore((state) => state.history);
  const historyIndex = useColorMapStore((state) => state.historyIndex);

  return direction === 'undo' ? (
    <GuideBox guideKey="undo">
      <Button title={<BiUndo />} size={size} disabled={!historyIndex} onClick={undo} />
    </GuideBox>
  ) : (
    <GuideBox guideKey="redo">
      <Button title={<BiRedo />} size={size} disabled={historyIndex === history.length - 1} onClick={redo} />
    </GuideBox>
  );
}
