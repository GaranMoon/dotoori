import { useEffect, useState } from 'react';

import { Button } from 'component/atom';
import { ButtonGroup } from 'component/molecule';
import { useExport } from 'hook/useExport';
import { useReset } from 'hook/useReset';
import { useColorMapStore } from 'store/ColorMapStore';

function ConfigButtonSet() {
  const { save, share } = useExport();
  const { confirmReset } = useReset();
  const { colorMap, history, historyIndex } = useColorMapStore((state) => state);
  const [disableExport, setDisableExport] = useState<boolean>(false);

  useEffect(() => {
    if (JSON.stringify(colorMap) === '{}') {
      setDisableExport(true);
      return;
    }
    setDisableExport(false);
  }, [historyIndex]);

  return (
    <ButtonGroup direction="column">
      <Button title="SAVE" disabled={disableExport} onClick={() => save()} />
      <Button title="SHARE" disabled={disableExport} onClick={() => share()} />
      <Button title="RESET" disabled={history.length <= 1} onClick={() => confirmReset()} />
    </ButtonGroup>
  );
}

export default ConfigButtonSet;
