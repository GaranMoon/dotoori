import { ButtonGroup } from 'component/molecule';
import copy from 'copy-to-clipboard';
import { useColorMapStore } from 'store/ColorMapStore';
import { useModalStore } from 'store/ModalStore';
import { useSettingStore } from 'store/SettingStore';

interface Props {
  onClickReset: () => void;
}

function ConfigButtonSet({ onClickReset }: Props) {
  const { colorMap, history } = useColorMapStore((state) => state);
  const { numOfBoxs } = useSettingStore((state) => state);
  const { setModal } = useModalStore((state) => state);
  const disabled = history.length <= 1;

  const handleClickShare = async () => {
    const url = `${window.location.origin}/?box=${numOfBoxs}&shared=${encodeURIComponent(JSON.stringify(colorMap))}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: document.title, url });
      } catch (error) {
        copyToClipboard(url);
      }
      return;
    }
    copyToClipboard(url);
  };

  const copyToClipboard = (url: string) => {
    copy(url);
    setModal({
      key: 'share',
      title: 'success',
      desc: "Your work's URL has been copied successfully.",
      cancelBtn: { title: 'OK' },
    });
  };

  return (
    <ButtonGroup
      direction="column"
      buttons={[
        { title: 'SAVE', disabled, onClick: () => onClickReset() },
        { title: 'SHARE', disabled, onClick: () => handleClickShare() },
        { title: 'RESET', disabled, onClick: () => onClickReset() },
      ]}
    />
  );
}

export default ConfigButtonSet;
