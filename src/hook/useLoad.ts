import { boxOption } from 'data/palette';
import LZString from 'lz-string';
import { useSearchParams } from 'react-router-dom';
import { useColorMapStore } from 'store/ColorMapStore';
import { useSettingStore } from 'store/SettingStore';
import { BackgroundColor, Color, DEFAULT_BG, DEFAUT_BOX } from 'type/common';

import { useMapHistory } from './useMapHistory';

export function useLoad() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addHistory } = useMapHistory();
  const { setNumOfBoxs, setBackgroundColor } = useSettingStore((state) => state);
  const { setColorMap } = useColorMapStore((state) => state);

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
    const map: { [key: string]: string[] } = JSON.parse(LZString.decompressFromEncodedURIComponent(shared));
    const decompression: Color = {};
    for (const [key, value] of Object.entries(map)) {
      for (const _ of value) {
        decompression[_] = key;
      }
    }
    return decompression;
  };

  return { load };
}
