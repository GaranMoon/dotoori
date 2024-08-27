import { RadioGroup } from 'component/molecule';
import { boxOption } from 'data/palette';
import { useReset } from 'hook/useReset';
import { useSettingStore } from 'store/SettingStore';

function BoxRadioSet() {
  const { confirmReset } = useReset();
  const numOfBoxs = useSettingStore((state) => state.numOfBoxs);

  return (
    <RadioGroup
      radios={boxOption.map((_) => ({
        title: `${_} Boxs`,
        selected: _ === numOfBoxs,
        onClick: () => confirmReset(_),
      }))}
    />
  );
}

export default BoxRadioSet;
