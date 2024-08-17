import { ButtonGroup } from 'component/molecule';
import { useExport } from 'hook/useExport';
import { useReset } from 'hook/useReset';
import { useColorMapStore } from 'store/ColorMapStore';

function ConfigButtonSet() {
  const { save, share } = useExport();
  const { confirmReset } = useReset();
  const { history } = useColorMapStore((state) => state);
  const disabled = history.length <= 1;

  return (
    <ButtonGroup
      direction="column"
      buttons={[
        { title: 'SAVE', disabled, onClick: () => save() },
        { title: 'SHARE', disabled, onClick: () => share() },
        { title: 'RESET', disabled, onClick: () => confirmReset() },
      ]}
    />
  );
}

export default ConfigButtonSet;
