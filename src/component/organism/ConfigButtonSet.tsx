import { ButtonGroup } from 'component/molecule';

interface Props {
  onReset: () => void;
}

function ConfigButtonSet({ onReset }: Props) {
  return (
    <ButtonGroup
      direction="column"
      buttons={[
        { title: 'SAVE', onClick: onReset },
        { title: 'SHARE', onClick: onReset },
        { title: 'RESET', onClick: onReset },
      ]}
    />
  );
}

export default ConfigButtonSet;
