import { useEffect } from 'react';

import { GridType } from 'component/atom';
import copy from 'copy-to-clipboard';
import html2canvas from 'html2canvas';
import LZString from 'lz-string';
import { useColorMapStore } from 'store/ColorMapStore';
import { useModalStore } from 'store/ModalStore';
import { useSettingStore } from 'store/SettingStore';

export function useExport() {
  const { setModal } = useModalStore((state) => state);
  const { colorMap } = useColorMapStore((state) => state);
  const { numOfBoxs, isShowConfig, isSaving, setIsShowConfig, setIsSaving } = useSettingStore(
    (state) => state,
  );

  useEffect(() => {
    if (isSaving) handleSave();
  }, [isSaving]);

  const save = () => {
    setIsSaving(true);
  };

  const handleSave = async () => {
    const elementId: GridType = 'capture';
    const element = document.getElementById(elementId);
    try {
      if (!element) throw new Error();
      const canvas = await html2canvas(element, { backgroundColor: null });
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
      setIsSaving(false);
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
