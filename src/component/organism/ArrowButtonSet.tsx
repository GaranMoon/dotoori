import { ReactNode } from 'react';

import { getClass } from 'util/common';

import { ArrowButton } from 'component/atom';
import { GuideBox } from 'component/molecule';
import { useTool } from 'hook/useTool';
import { RiCheckboxBlankCircleLine } from 'react-icons/ri';
import { RiCheckboxBlankCircleFill } from 'react-icons/ri';
import { RxTriangleLeft } from 'react-icons/rx';
import { useSettingStore } from 'store/SettingStore';
import { BackgroundColor } from 'type/common';

import styles from './ArrowButtonSet.module.scss';

interface Props {
  size?: 'sm' | 'lg';
}

function ArrowButtonSet({ size = 'lg' }: Props) {
  const { layoutMode, backgroundColor } = useSettingStore((state) => state);
  const { switchBackgroundColor, moveDrawing } = useTool();
  const centerIcon =
    backgroundColor === BackgroundColor.BLACK ? <RiCheckboxBlankCircleFill /> : <RiCheckboxBlankCircleLine />;

  const renderDirectionSet = (icon?: ReactNode) => {
    return (
      <>
        <GuideBox guideKey="arrowUp" style={{ position: 'absolute', top: 0 }}>
          <ArrowButton size={size} icon={icon} direction="up" onClick={() => moveDrawing('up')} />
        </GuideBox>
        <GuideBox guideKey="arrowLeft" style={{ position: 'absolute', left: 0 }}>
          <ArrowButton size={size} icon={icon} direction="left" onClick={() => moveDrawing('left')} />
        </GuideBox>
        <GuideBox guideKey="arrowRight" style={{ position: 'absolute', right: 0 }}>
          <ArrowButton size={size} icon={icon} direction="right" onClick={() => moveDrawing('right')} />
        </GuideBox>
        <GuideBox guideKey="arrowDown" style={{ position: 'absolute', bottom: 0 }}>
          <ArrowButton size={size} icon={icon} direction="down" onClick={() => moveDrawing('down')} />
        </GuideBox>
      </>
    );
  };

  if (!layoutMode) {
    return (
      <div className={styles.container}>
        {renderDirectionSet()}
        <GuideBox guideKey="arrowCenter">
          <ArrowButton size={size} direction="center" icon={centerIcon} onClick={switchBackgroundColor} />
        </GuideBox>
      </div>
    );
  }

  return (
    <div className={getClass(['container', size], styles)}>{renderDirectionSet(<RxTriangleLeft />)}</div>
  );
}

export default ArrowButtonSet;
