import styles from 'component/atom/Grid.module.scss';
import copy from 'copy-to-clipboard';
import html2canvas from 'html2canvas';
import LZString from 'lz-string';
import { useColorMapStore } from 'store/ColorMapStore';
import { useModalStore } from 'store/ModalStore';
import { useSettingStore } from 'store/SettingStore';
import { CAPTURE } from 'type/common';

export function useExport() {
  const { colorMap } = useColorMapStore((state) => state);
  const { numOfBoxs, isShowConfig, setIsShowConfig } = useSettingStore((state) => state);
  const { setModal } = useModalStore((state) => state);

  const save = async () => {
    if (isShowConfig) setIsShowConfig(false);
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
          key: 'saveFail',
          title: 'error',
          desc: 'Sorry, saving failed due to an unknown reason.',
          cancelBtn: { title: 'OK' },
        });
        console.log(`save failed: ${error}`);
      } finally {
        element.classList.remove(styles[CAPTURE]);
      }
    }
  };

  const share = async () => {
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

  return { save, share };
}
