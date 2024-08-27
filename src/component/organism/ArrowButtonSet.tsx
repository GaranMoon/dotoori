import { ReactNode } from 'react';

import { getClass } from 'util/common';

import { ArrowButton } from 'component/atom';
import { GuideBox } from 'component/molecule';
import { useTool } from 'hook/useTool';
import { RiCheckboxBlankCircleFill, RiCheckboxBlankCircleLine } from 'react-icons/ri';
import { RxTriangleLeft } from 'react-icons/rx';
import { useSettingStore } from 'store/SettingStore';
import { BackgroundColor } from 'type/common';

import styles from './ArrowButtonSet.module.scss';

interface Props {
  size?: 'sm' | 'lg';
}

function ArrowButtonSet({ size = 'lg' }: Props) {
  const { layoutMode, backgroundColor } = useSettingStore((state) => state);
  const { switchBackgroundColor } = useTool();
  const centerIcon =
    backgroundColor === BackgroundColor.BLACK ? <RiCheckboxBlankCircleFill /> : <RiCheckboxBlankCircleLine />;

  if (!layoutMode) {
    return (
      <div className={styles.container}>
        <DirectionSet size={size} />
        <GuideBox guideKey="arrowCenter">
          <ArrowButton size={size} direction="center" icon={centerIcon} onClick={switchBackgroundColor} />
        </GuideBox>
      </div>
    );
  }

  return (
    <div className={getClass(['container', size], styles)}>
      <DirectionSet size={size} icon={<RxTriangleLeft />} />
    </div>
  );
}

export default ArrowButtonSet;

function DirectionSet({ size, icon }: Props & { icon?: ReactNode }) {
  const { moveDrawing } = useTool();

  return (
    <>
      <GuideBox guideKey="arrowUp" customStyle>
        <ArrowButton size={size} icon={icon} direction="up" onClick={() => moveDrawing('up')} />
      </GuideBox>
      <GuideBox guideKey="arrowLeft" customStyle>
        <ArrowButton size={size} icon={icon} direction="left" onClick={() => moveDrawing('left')} />
      </GuideBox>
      <GuideBox guideKey="arrowRight" customStyle>
        <ArrowButton size={size} icon={icon} direction="right" onClick={() => moveDrawing('right')} />
      </GuideBox>
      <GuideBox guideKey="arrowDown" customStyle>
        <ArrowButton size={size} icon={icon} direction="down" onClick={() => moveDrawing('down')} />
      </GuideBox>
    </>
  );
}
