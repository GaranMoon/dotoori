import { RadioGroup } from 'component/molecule';
import { boxOption } from 'data/palette';
import { useSettingStore } from 'store/SettingStore';

interface Props {
  onChangeBox: (e: number) => void;
}

function BoxRadioSet({ onChangeBox }: Props) {
  const { numOfBoxs } = useSettingStore((state) => state);

  return (
    <RadioGroup
      radios={boxOption.map((_, _i) => ({
        title: `${_} Boxs`,
        selected: _ === numOfBoxs,
        onClick: () => onChangeBox(_),
      }))}
    />
  );
}

export default BoxRadioSet;
