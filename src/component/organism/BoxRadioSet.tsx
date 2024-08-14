import { RadioGroup } from 'component/molecule';
import { useSettingStore } from 'store/SettingStore';

const options = [15, 20, 25, 30, 35];

interface Props {
  onReset: () => void;
}

function BoxRadioSet({ onReset }: Props) {
  const { numOfBoxs, setNumOfBoxs } = useSettingStore((state) => state);

  const handleChange = (select: number) => {
    setNumOfBoxs(select);
    onReset();
  };

  return (
    <RadioGroup
      radios={options.map((_, _i) => ({
        title: `${_} Boxs`,
        selected: _ === numOfBoxs,
        onClick: () => handleChange(_),
      }))}
    />
  );
}

export default BoxRadioSet;
