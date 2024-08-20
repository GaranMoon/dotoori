import { useEffect } from 'react';

import { GridType } from 'component/atom';
import copy from 'copy-to-clipboard';
import html2canvas from 'html2canvas';
import LZString from 'lz-string';
import { useColorMapStore } from 'store/ColorMapStore';
import { usePopupStore } from 'store/PopupStore';
import { useSettingStore } from 'store/SettingStore';

export function useExport() {
  const { setModal } = usePopupStore((state) => state);
  const { colorMap } = useColorMapStore((state) => state);
  const { isSaving, numOfBoxs, backgroundColor, setIsSaving } = useSettingStore((state) => state);

  useEffect(() => {
    if (isSaving) handleSave();
  }, [isSaving]);

  const save = () => {
    setIsSaving(true);
  };

  const handleSave = async () => {
    if (checkKakao()) return;
    setModal({
      key: 'saving',
      title: 'info',
      desc: 'Saving...',
    });
    const elementId: GridType = 'capture';
    const element = document.getElementById(elementId);
    let isSuccess = false;
    try {
      if (!element) throw new Error();
      const canvas = await html2canvas(element, { backgroundColor: null });
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'dotoori.png';
      link.click();
      isSuccess = true;
    } catch (error) {
      setModal({
        key: 'save-fail',
        title: 'error',
        desc: 'Sorry, saving failed due to an unknown reason.',
        cancelBtn: { title: 'OK' },
      });
      console.log(`save failed: ${error}`);
    } finally {
      setIsSaving(false);
      if (isSuccess) {
        setModal({
          key: 'save-success',
          title: 'success',
          desc: 'Saved!',
          cancelBtn: { title: 'OK' },
        });
      }
    }
  };

  const checkKakao = () => {
    const isKakao = /KAKAOTALK/i.test(navigator.userAgent);
    if (isKakao) {
      setModal({
        key: 'save-fail-kakao',
        title: 'error',
        desc: 'The KakaoTalk in-app browser does not support image downloads. Please try other browsers such as Chrome or Safari.',
        cancelBtn: { title: 'OK' },
      });
    }
    return isKakao;
  };

  const share = async () => {
    const url = `${window.location.origin}/?box=${numOfBoxs}&bg=${backgroundColor}&shared=${compressColorMap()}`;
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

  const compressColorMap = () => {
    const compression: { [key: string]: string[] } = {};
    for (const [key, value] of Object.entries(colorMap)) {
      if (!compression[value]) {
        compression[value] = [];
      }
      compression[value].push(key);
    }
    return LZString.compressToEncodedURIComponent(JSON.stringify(compression));
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
