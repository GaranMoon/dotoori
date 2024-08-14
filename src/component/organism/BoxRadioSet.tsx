import { RadioGroup } from 'component/molecule';
import { useSettingStore } from 'store/SettingStore';

const options = [15, 20, 25, 30, 35];

interface Props {
  onChangeBox: (e: number) => void;
}

function BoxRadioSet({ onChangeBox }: Props) {
  const { numOfBoxs } = useSettingStore((state) => state);

  return (
    <RadioGroup
      radios={options.map((_, _i) => ({
        title: `${_} Boxs`,
        selected: _ === numOfBoxs,
        onClick: () => onChangeBox(_),
      }))}
    />
  );
}

export default BoxRadioSet;
