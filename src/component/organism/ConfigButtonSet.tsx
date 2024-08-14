import { ButtonGroup } from 'component/molecule';

interface Props {
  onClickReset: () => void;
}

function ConfigButtonSet({ onClickReset }: Props) {
  return (
    <ButtonGroup
      direction="column"
      buttons={[
        { title: 'SAVE', onClick: () => onClickReset() },
        { title: 'SHARE', onClick: () => onClickReset() },
        { title: 'RESET', onClick: () => onClickReset() },
      ]}
    />
  );
}

export default ConfigButtonSet;
