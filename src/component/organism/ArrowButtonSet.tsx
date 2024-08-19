import { getClass } from 'util/common';

import { ArrowButton } from 'component/atom';
import { useTool } from 'hook/useTool';
import { RiCheckboxBlankCircleLine } from 'react-icons/ri';
import { RiCheckboxBlankCircleFill } from 'react-icons/ri';
import { RxTriangleLeft } from 'react-icons/rx';
import { useSettingStore } from 'store/SettingStore';
import { BackgroundColor, Direction, LayoutMode } from 'type/common';

import styles from './ArrowButtonSet.module.scss';

const directions: Direction[] = ['up', 'left', 'right', 'down'];

interface Props {
  size?: 'sm' | 'lg';
}

function ArrowButtonSet({ size = 'lg' }: Props) {
  const { layoutMode, backgroundColor } = useSettingStore((state) => state);
  const { switchBackgroundColor, moveDrawing } = useTool();
  const isCollapseMode = layoutMode === LayoutMode.COLLAPSE;
  const arrowIcon = isCollapseMode ? <RxTriangleLeft /> : undefined;
  const centerIcon =
    backgroundColor === BackgroundColor.BLACK ? <RiCheckboxBlankCircleFill /> : <RiCheckboxBlankCircleLine />;

  return (
    <div className={getClass(['container', size], styles)}>
      {!isCollapseMode && (
        <ArrowButton size={size} direction="center" icon={centerIcon} onClick={switchBackgroundColor} />
      )}
      {directions.map((_, _i) => (
        <ArrowButton key={_i} size={size} icon={arrowIcon} direction={_} onClick={() => moveDrawing(_)} />
      ))}
    </div>
  );
}

export default ArrowButtonSet;
