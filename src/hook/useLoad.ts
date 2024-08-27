import { boxOption, colorData } from 'data/palette';
import LZString from 'lz-string';
import { useSearchParams } from 'react-router-dom';
import { useColorMapStore } from 'store/ColorMapStore';
import { useSettingStore } from 'store/SettingStore';
import { BackgroundColor, Color, DEFAULT_BG, DEFAUT_BOX } from 'type/common';

import { useMapHistory } from './useMapHistory';

export function useLoad() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addHistory } = useMapHistory();
  const setNumOfBoxs = useSettingStore((state) => state.setNumOfBoxs);
  const setBackgroundColor = useSettingStore((state) => state.setBackgroundColor);
  const setColorMap = useColorMapStore((state) => state.setColorMap);

  const load = () => {
    const shared = searchParams.get('shared');
    const box = searchParams.get('box');
    const bg = searchParams.get('bg');
    if (shared && box) {
      try {
        const map = decompressColorMap(shared);
        if (typeof map === 'object') {
          setColorMap(map);
          addHistory(map);
          const numOfBoxs = Number(box);
          setNumOfBoxs(boxOption.includes(numOfBoxs) ? numOfBoxs : DEFAUT_BOX);
          const backgroundColor = bg as BackgroundColor;
          const isBackGround = Object.values(BackgroundColor).includes(backgroundColor);
          setBackgroundColor(isBackGround ? backgroundColor : DEFAULT_BG);
          searchParams.delete('shared');
          searchParams.delete('box');
          searchParams.delete('bg');
          setSearchParams(searchParams);
          return;
        }
      } catch (e) {
        console.error('Invalid JSON:', e);
      }
      return;
    }
  };

  const decompressColorMap = (shared: string) => {
    const decompression: { [key: string]: string } = JSON.parse(
      LZString.decompressFromEncodedURIComponent(shared),
    );
    const mapArr: { [id: string]: string[] } = {};
    for (const [id, xyIndexs] of Object.entries(decompression)) {
      mapArr[id] = xyIndexs.split(',');
    }
    const colorList = Object.values(colorData);
    const map: Color = {};
    for (const [id, xyIndexList] of Object.entries(mapArr)) {
      for (const xyIndex of xyIndexList) {
        map[xyIndex] = colorList[Number(id)];
      }
    }
    return map;
  };

  return { load };
}
