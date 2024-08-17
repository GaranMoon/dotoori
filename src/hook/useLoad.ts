import { boxOption } from 'data/palette';
import LZString from 'lz-string';
import { useSearchParams } from 'react-router-dom';
import { useColorMapStore } from 'store/ColorMapStore';
import { useSettingStore } from 'store/SettingStore';

import { useMapHistory } from './useMapHistory';

export function useLoad() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addHistory } = useMapHistory();
  const { setNumOfBoxs } = useSettingStore((state) => state);
  const { setColorMap } = useColorMapStore((state) => state);

  const load = () => {
    const shared = searchParams.get('shared');
    const box = searchParams.get('box');
    if (shared && box) {
      try {
        const map = JSON.parse(LZString.decompressFromEncodedURIComponent(shared));
        if (typeof map === 'object') {
          setColorMap(map);
          addHistory(map);
          const numOfBoxs = Number(box);
          setNumOfBoxs(boxOption.includes(numOfBoxs) ? numOfBoxs : boxOption[1]);
          searchParams.delete('shared');
          searchParams.delete('box');
          setSearchParams(searchParams);
          return;
        }
      } catch (e) {
        console.error('Invalid JSON:', e);
      }
      return;
    }
  };

  return { load };
}
