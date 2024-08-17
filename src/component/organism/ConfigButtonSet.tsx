import styles from 'component/atom/Grid.module.scss';
import { ButtonGroup } from 'component/molecule';
import copy from 'copy-to-clipboard';
import { useReset } from 'hook/useReset';
import html2canvas from 'html2canvas';
import LZString from 'lz-string';
import { useColorMapStore } from 'store/ColorMapStore';
import { useModalStore } from 'store/ModalStore';
import { useSettingStore } from 'store/SettingStore';
import { CAPTURE } from 'type/common';

function ConfigButtonSet() {
  const { confirmReset } = useReset();
  const { colorMap, history } = useColorMapStore((state) => state);
  const { numOfBoxs, setIsShowConfig } = useSettingStore((state) => state);
  const { setModal } = useModalStore((state) => state);
  const disabled = history.length <= 1;

  const hanldeClickSave = async () => {
    setIsShowConfig(false);
    const element = document.getElementById(CAPTURE);
    if (element) {
      try {
        element.classList.add(styles[CAPTURE]);
        const canvas = await html2canvas(element, { scale: 10, backgroundColor: null });
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'dotoori';
        link.click();
      } catch (error) {
        setModal({
          key: 'shareFail',
          title: 'error',
          desc: 'Sorry, saving failed due to an unknown reason.',
          cancelBtn: { title: 'OK' },
        });
      } finally {
        element.classList.remove(styles[CAPTURE]);
      }
    }
  };

  const handleClickShare = async () => {
    const zipMap = LZString.compressToEncodedURIComponent(JSON.stringify(colorMap));
    const url = `${window.location.origin}/?box=${numOfBoxs}&shared=${zipMap}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: document.title, url });
      } catch (error) {
        console.log(`share canceled: ${error}`);
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
        { title: 'SAVE', disabled, onClick: () => hanldeClickSave() },
        { title: 'SHARE', disabled, onClick: () => handleClickShare() },
        { title: 'RESET', disabled, onClick: () => confirmReset() },
      ]}
    />
  );
}

export default ConfigButtonSet;
