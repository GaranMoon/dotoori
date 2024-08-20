import { useEffect, useState } from 'react';

import { useSettingStore } from 'store/SettingStore';
import { COLLAPSE_MAX, LayoutMode } from 'type/common';

export function useLayout() {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const { isShowConfig, layoutMode, setLayoutMode, setIsShowConfig } = useSettingStore((state) => state);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenWidth < COLLAPSE_MAX) {
      if (!layoutMode) setLayoutMode(LayoutMode.COLLAPSE);
      return;
    }
    if (layoutMode) {
      setLayoutMode(LayoutMode.NONE);
      if (isShowConfig) setIsShowConfig(false);
      return;
    }
  }, [screenWidth]);

  return { screenWidth };
}
